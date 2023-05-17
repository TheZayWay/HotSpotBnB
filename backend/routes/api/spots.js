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
      .withMessage("Name is required")
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
        return res.json(newUrl)
      }
      return;
    }
  ); 


  //delete a spot
  // router.delete('/:spotId', requireAuth, async(req,res,next)=>{
  //   const spotId = req.params.spotId;
  //   const spot = await Spot.findByPk(spotId);

  //   if(spot){
  //     spot.destroy();

  //     res.json({
  //         message: "Successfully deleted"
  //       })
  //   }else{
  //     res.status(404);
  //     res.json({
  //         message: "Spot couldn't be found"
  //     })
  //   }
  // })


module.exports = router;