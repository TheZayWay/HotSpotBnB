const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

const validateCreateSpot = [
  check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required")
      // .isLength({ max: 100 })
      // .withMessage("Address must be 100 characters or less")
  ,
  check("city")
      .exists({ checkFalsy: true })
      .withMessage("City is required")
      // .isLength({ max: 85 })
      // .withMessage("City must be 85 characters or less")
  ,
  check("state")
      .exists({ checkFalsy: true })
      .withMessage("State is required")
      // .isLength({ max: 20 })
      // .withMessage("State must be 20 characters or less")
  ,
  check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required")
      // .isLength({ max: 60 })
      // .withMessage("Country must be 60 characters or less")
  ,
  check("lat")
      // .exists({ checkFalsy: true })
      .isFloat()
      .withMessage("Latitude is not valid")
  ,
  check("lng")
      // .exists({ checkFalsy: true })
      .isFloat()
      .withMessage("Longitude is not valid")
  ,
  check("name")
      .exists({ checkFalsy: true })
      .withMessage("Name is required")
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters")
  ,
  check("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required")
      // .isLength({ max: 500 })
      // .withMessage("Description must be 500 characters or less")
  ,
  check("price")
      // .exists({ checkFalsy: true })
      .isFloat()
      .withMessage("Price per day is required")
      // .isFloat({ min: 1, max: 100000})
      // .withMessage("Price must be an integer from 1 to 100000")
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
    const spotId = req.params.id;

    const spots = await Spot.findByPk(spotId, {
      include: [
        {model: Review},
        {model: User, attributes: ["id", "firstName", "lastName"]},
        {model: SpotImage, attributes: ["id", "url", "preview"]}
      ]
    });

    if (!spots) {
      res.status(404).json({message: "Spot couldn't be found"})
    }
    
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
  })

  //Create new post
  router.post(
    '/', 
    requireAuth,
    validateCreateSpot,
    async (req,res) => {
      const ownerId = req.user.id;
      const { address, city, state, country, lat, lng, name, description, price} = req.body;
      const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price});
      // if (!newSpot) {
      //   res.status(400)
      // }
      return res.status(201).json(newSpot)
  });

module.exports = router;