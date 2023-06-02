const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const validateCreateSpot = [
  check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required")
  ,
  check("city")
      .exists({ checkFalsy: true })
      .withMessage("City is required")
  ,
  check("state")
      .exists({ checkFalsy: true })
      .withMessage("State is required")
  ,
  check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required")
  ,
  check("lat")
      .isFloat()
      .withMessage("Latitude is not valid")
  ,
  check("lng")
      .isFloat()
      .withMessage("Longitude is not valid")
  ,
  check("name")
      .exists({ checkFalsy: true })
      .withMessage("Name must be less than 50 characters")
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters")
  ,
  check("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required")
  ,
  check("price")
      .isFloat()
      .withMessage("Price per day is required")
  ,
  handleSpotValidationErrors
]

const validateDuplicateReview = [
  check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required")
  ,
  check("stars")
      .exists({ checkFalsy: true })
      .withMessage("Stars must be an integer from 1 to 5")
      .isInt({max: 5, min: 0})
      .withMessage("Stars must be an integer from 1 to 5")
  ,
  handleSpotValidationErrors
]

const validateBooking = [
  check("endDate")
    .exists({ checkFalsy: true})
    .isAfter()
    .withMessage("endDate cannot be on or before startDate")
    ,
    handleSpotValidationErrors
]

const validateQuery = [
  check("page")
      .optional()
      .isInt({min:1})
      .withMessage("Page must be greater than or equal to 1")
  ,
  check("size")
      .optional()
      .isInt({min:1})
      .withMessage("Size must be greater than or equal to 1")
  ,
  check("minLat")
      .optional()
      .isDecimal()
      .withMessage("Minimum latitude is invalid")
  ,
  check("maxLat")
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid")
  ,
  check("minLng")
      .optional()
      .isDecimal()
      .withMessage("Minimum longitude is invalid")
  ,
  check("maxLng")
      .optional()
      .isDecimal()
      .withMessage("Maximum longitude is invalid")
  ,
  check("minPrice")
      .optional()
      .isFloat({min: 0})
      .withMessage("Minimum price must be greater than or equal to 0")
  ,
  check("maxPrice")
      .optional()
      .isFloat({min: 0})
      .withMessage("Maximum price must be greater than or equal to 0")
  ,
  handleSpotValidationErrors
]


  // Returns all spots  
  router.get('/', validateQuery, async (req, res) => {
    // const { Review, SpotImage } = require('../../db/models');
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let pagination = {};

    page = +page;
    size = +size;

    if (!page) page = 1;
    if (!size) size = 20;
    if (page > 10) page = 10;
    if (size > 20) size = 20;

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    let where = {};

    if (minLat) where.lat = {[Op.gte]: parseFloat(minLat)};

    if (maxLat) where.lat = {[Op.lte]: parseFloat(maxLat)};

    if (minLat && maxLat) where.lat = {[Op.between]: [parseFloat(minLat),parseFloat(maxLat)]};

    if (minLng) where.lng = {[Op.gte]: parseFloat(minLng)};

    if (maxLng) where.lng = {[Op.lte]: parseFloat(maxLng)};

    if (minLng && maxLng) where.lng = {[Op.between]: [parseFloat(minLng), parseFloat(maxLng)]};

    if (minPrice) where.price = {[Op.gte]: parseFloat(minPrice)};

    if (maxPrice) where.price = {[Op.lte]: parseFloat(maxPrice)};

    if (minPrice && maxPrice) where.price = {[Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]};


    const spots = await Spot.findAll({
      where,
      include: [
        {model: SpotImage},
        {model: Review}
      ],
      ...pagination
    });

    let spotsList = [];
    spots.forEach((spot) => {
      spotsList.push(spot.toJSON())
    });
    
    spotsList.forEach((spot) => {
      spot.SpotImages.forEach((image) => {
        spot.previewImage = image.url
      });

      let sum = 0; 
      let avg = 0;

      spot.Reviews.forEach((review) => {
        sum += review.stars;
      });
      
      avg = sum / spot.Reviews.length;
      spot.avgRating = avg;
      if (!spot.avgRating) {
        spot.avgRating = 0
      }
      
      delete spot.Reviews;
      delete spot.SpotImages;
    })
      
    return res.json({Spots: spotsList, page: page, size: size})
  });

  
  //Get all Spots owned by the Current User
  router.get(
   '/current',
   requireAuth,
   async (req,res) => {
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
      where: {
        ownerId: ownerId
      },
      include: [
        {model: SpotImage},
        {model: Review}
      ]     
    });

    let spotsList = [];
    
    spots.forEach((spot) => {
      spotsList.push(spot.toJSON())
    });
    
    spotsList.forEach((spot) => {
      spot.SpotImages.forEach((image) => {
        spot.previewImage = image.url
      });

      let sum = 0; 
      let avg = 0;

      spot.Reviews.forEach((review) => {
        sum += review.stars;
      });
      
      avg = sum / spot.Reviews.length;
      spot.avgRating = avg;
      if (!spot.avgRating) {
        spot.avgRating = 0
      }
      
      delete spot.Reviews;
      delete spot.SpotImages;
    })  
    return res.json({Spots: spotsList}) 
  
  });

  //Get Details for a Spot from an id

  router.get('/:spotId', async (req,res) => {
    const spotId = req.params.spotId;

    const spots = await Spot.findByPk(spotId, {
      include: [
        {model: Review},
        {model: User, attributes: ["id", "firstName", "lastName"]},
        {model: SpotImage, attributes: ["id", "url", "preview"]}
      ]
    });

    if (spots) {
      spots.dataValues.numReviews = spots.dataValues.Reviews.length;
    let sum = 0
    let avg = 0
    let reviewsArr = spots.dataValues.Reviews
    
    reviewsArr.forEach((review) => {
      sum += review.stars
    })
    avg = sum / reviewsArr.length;
    
    spots.dataValues.avgStar = avg
    delete spots.dataValues.Reviews;
    return res.json(spots)
    }
    else {
      res.status(404).json({message: "Spot couldn't be found"})
    }
  });

  //Create new post
  router.post(
    '/', 
    requireAuth,
    validateCreateSpot,
    async (req,res) => {
      const ownerId = req.user.id;
      const { address, city, state, country, lat, lng, name, description, price} = req.body;
      const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price});
      return res.status(201).json(newSpot)
    }
  );

  //Add image to a spot based on spots id

  router.post(
    '/:spotId/images',
    requireAuth,
    async (req,res) => {
      const spotId = req.params.spotId
      const ownerId = req.user.id;
      const { url, preview} = req.body
      const spot = await Spot.findByPk(spotId, {
        attributes:{ exclude: ['id', 'updatedAt', 'createdAt']},
        where: {
          ownerId: ownerId
        }})
      if (!spot) {
        res.status(404).json({message: "Spot couldn't be found"})
      }  
      if (spot.ownerId === req.user.id) {
        const newUrl = await SpotImage.create({spotId, url, preview})
        delete newUrl.dataValues.spotId
        delete newUrl.dataValues.updatedAt
        delete newUrl.dataValues.createdAt
        return res.json(newUrl)
      }
      return;
    }
  ); 

  //edit a spot
    router.put(
      '/:spotId',
      requireAuth,
      validateCreateSpot,
      async (req, res) => {
        const spotId = req.params.spotId;
        const ownerId = req.user.id;
        const spot = await Spot.findByPk(spotId);
        const { address, city, country, lat, lng, name, description, price } = req.body
        
        if (!spot) {
          res.status(404).json({message: "Spot couldn't be found"})
        }

        if (spot.ownerId === ownerId) {
          spot.set({
            address: address,
            city: city,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
          })
          res.json(spot)
        }
        else {
          res.status(403).json({message: "Spot must belong to current user."})
        }
        
      }
    );


  //delete a spot
  router.delete(
    '/:spotId', 
    requireAuth, 
    async (req, res) => {
      let userId = req.user.id;
      const spotId = req.params.spotId;
      const spot = await Spot.findByPk(spotId);     
      if (!spot) {
          res.status(404).json({ message: "Spot couldn't be found"});
      }
      if (spot.ownerId === userId) {
        spot.destroy();
        res.json({ message: "Successfully deleted"})
      }
      else {
        res.status(403).json({message: "Spot must belong to current user"})
      } 
    }
  )

//NON SPOT ROUTES WITH SPOT URLS


    //Return all reviews that belong to a spot specified by id
    
    router.get(
      '/:spotId/reviews',
      requireAuth,
      async (req, res) => {
        const spotId = req.params.spotId;
        const spots = await Spot.findByPk(spotId, {
          attributes: {
            exclude: ['id','ownerId','address','city','state','country','lat','lng','name','description','price','createdAt','updatedAt']
          },
          include: [
            { 
              model: Review, 
              include: [{model: User, attributes: ['id', 'firstName', 'lastName']},{model: ReviewImage, attributes: ['id', 'url']}]
            }
          ]
        });
        if (!spots) {
          res.status(404).json({message: "Spot couldn't be found"})
        }
        reviews = spots.dataValues;       
        res.json(reviews);
      }
    );

    //Create a review for spot by spot Id
    router.post(
      '/:spotId/reviews',
      requireAuth,
      validateDuplicateReview,
      async (req, res) => {
        const spotId = req.params.spotId;
        const userId = req.user.id;
        const {review, stars} = req.body
        const spot = await Spot.findByPk(spotId);
       if (!spot) {
        return res.status(404).json({message: "Spot couldn't be found"})
      }
      
      const existingReview = await Review.findOne({
        where: {
          userId: userId,
          spotId: spotId
        }
      });
      if (existingReview) {
        return res.status(500).json({ message: "User already has a review for this spot" });
      }
      
      const newReview = await Review.create({
          userId: userId,
          spotId: spotId,
          review: review,
          stars: stars
        });
        res.status(201).json(newReview)
      }
    )

    // get all bookings for spot based on spot id
    router.get(
      '/:spotId/bookings',
      requireAuth,
      async (req,res) => {
        const spotId = req.params.spotId;
        const ownerId = req.user.id; 
        
        const spot = await Spot.findByPk(spotId, {
          include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Booking}
          ]
        })
        if (!spot) {
          res.status(404).json({message: "Spot couldn't be found"})
        }
        const bookings = spot.dataValues.Bookings
        console.log(bookings)
        const spotOwnerId = spot.dataValues.ownerId;
        const user = spot.dataValues.User;
        if (ownerId === spotOwnerId) {
          bookings.push({"User": user})
          res.json({"Bookings": bookings})
        } else {
          for (let i = 0; i < bookings.length; i++) {
            delete bookings[i].dataValues.id;
            delete bookings[i].dataValues.userId;
            delete bookings[i].dataValues.createdAt;
            delete bookings[i].dataValues.updatedAt;
          }         
          res.json({"Bookings": bookings})
        }
      }
    );
    
    //create booking based on spot id
    router.post('/:spotId/bookings', requireAuth, async (req, res) => {
      const spotId = req.params.spotId;
      const currentUser = req.user.id;
      let { startDate, endDate } = req.body;
    
      if (startDate >= endDate) {
        return res.status(400).json({
          message: "Bad Request",
          errors: {
            endDate: "endDate cannot be on or before startDate"
          }
        });
      }
    
      const spot = await Spot.findByPk(spotId, {
        attributes: ['ownerId']
      });
    
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
    
      const existingBooking = await Booking.findOne({
        where: {
          spotId: Number(spotId),
          startDate: {
            [Op.lte]: endDate
          },
          endDate: {
            [Op.gte]: startDate
          }
        }
      });
    
      if (existingBooking) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
        });
      }
    
      const ownerId = spot.dataValues.ownerId;
      if (ownerId !== currentUser) {
        const newBooking = await Booking.create({
          spotId: Number(spotId),
          userId: currentUser,
          startDate: startDate,
          endDate: endDate
        });
        res.status(201).json(newBooking);
      }
      else {
        res.status(403).json({message: "Owner cannot create a booking"})
      }
    });
    
module.exports = router;