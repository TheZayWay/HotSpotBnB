const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
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
    const spot = await Spot.findAll();
    return res.json({spot})
  });

  //Create a spot
  router.post('/', async (req,res) => {
    const { id, ownerId, address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({id, ownerId, address, city, state, country, lat, lng, name, description, price});
    return res.status(201).json(newSpot)
  });

module.exports = router;