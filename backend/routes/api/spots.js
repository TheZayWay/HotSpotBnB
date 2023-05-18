const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

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


  // Returns all spots  
  router.get('/', async (req, res) => {
    // const { Review, SpotImage } = require('../../db/models');
    
    const spots = await Spot.findAll({
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
    return res.json({spotsList})
  });
  
  //Get all Spots owned by the Current User
  router.get(
   '/current',
   requireAuth,
   async (req,res) => {
    // const { Review, SpotImage } = require('../../db/models');
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
    return res.json({spotsList}) 
  
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
          res.status(404).json({message: "Spot couldn't be found"})
        }
        return;
      }
    );


  //delete a spot
  router.delete(
    '/:spotId', 
    requireAuth, 
    async (req, res) => {
      const spotId = req.params.spotId;
      const spot = await Spot.findByPk(spotId);

      if(spot) {
        spot.destroy();
        res.json({ message: "Successfully deleted"})
      } else {
          res.status(404);
          res.json({ message: "Spot couldn't be found"})
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
        reviews = spots.dataValues;       
        res.json(reviews)
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

    // create a booking from a spot based on spot id    
    router.post(
      '/:spotId/bookings',
      requireAuth,
      // validateBooking,
      async (req, res) => {
        const spotId = req.params.spotId;
        const currentUser = req.user.id;
        const { startDate, endDate } = req.body;

        if (startDate >= endDate) {
          res.status(400).json({
            message: "Bad Request",
            errors: {
              endDate: "endDate cannot be on or before startDate"
            }
          })
        }
        const spot = await Spot.findByPk(spotId, {
          attributes: ['ownerId']
        });
        if (!spot) {
          res.status(404).json({message: "Spot couldn't be found"});
        }
        //find all bookings for that spot 
        const existingBookings = await Booking.findAll({
          where: {
            spotId: Number(spotId),
          }
        });
        console.log(existingBookings)
        // if (existingBookings)

        const ownerId = spot.dataValues.ownerId;
        if (ownerId === currentUser) {
          const newBooking = await Booking.create({
            spotId: Number(spotId),
            userId: currentUser,
            startDate: startDate,
            endDate: endDate
          })
          res.json(newBooking);
        }
        
        
        
      }
    );

module.exports = router;