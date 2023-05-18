const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

// get all current user bookings
router.get(
    '/current', 
    requireAuth,
    async(req,res) => {
        const userId = req.user.id;
        const bookings = await Booking.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: Spot,
                    include: [{ model: SpotImage, attributes: ["url"]}]
                }           
            ]
        });

        const bookingUserId = bookings[0].dataValues.userId;
        if (userId === bookingUserId) {
            let url = bookings[0].dataValues.Spot.dataValues.SpotImages[0].url
            let spot = bookings[0].dataValues.Spot.dataValues
             
            spot.previewImage = url
            delete bookings[0].dataValues.Spot.dataValues.SpotImages
            res.json({bookings})
        }
    }
)

// update existing booking

router.put(
    '/:bookingId',
    requireAuth,
    async (req, res) => {
        
    }
);










module.exports = router;