const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

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

  router.get('/:id', async (req,res) => {
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

  
  // spotsList





  //Create a spot
  router.post('/', async (req,res) => {
    const { id, ownerId, address, city, state, country, lat, lng, name, description, price} = req.body
   
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price});
//     const cats = await Cat.findAll({ where: { name: 'Lucy' }, include: Owner })
// cats[0].Owner 
    
    
    // return res.status(201).json(newSpot)
  });

module.exports = router;