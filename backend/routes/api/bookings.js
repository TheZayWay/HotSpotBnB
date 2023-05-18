const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');


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
);

// update existing booking

router.put(
    '/:bookingId',
    requireAuth,
    async (req, res) => {
        const currentUserId = req.user.id;
        const bookingId = req.params.bookingId;
        let {id, userId, spotId, startDate, endDate, createdAt, updatedAt } = req.body;
        const booking = await Booking.findByPk(bookingId, {
            where: {
                userId: currentUserId
            }
        });
        
        if (!booking) {
            res.status(404).json({message: "Booking couldn't be found"})
        }

        if (startDate >= endDate) {
            return res.status(400).json({
              message: "Bad Request",
              errors: {
                endDate: "endDate cannot be on or before startDate"
              }
            });
          }

          startDate = new Date(startDate);
          endDate = new Date(endDate);
          currentStartDate = booking.dataValues.startDate;
          currentEndDate = booking.dataValues.endDate;
          currentStartDate = new Date(currentStartDate);
          currentEndDate = new Date(currentEndDate);

          if (currentEndDate < new Date()) {
            res.json({message: "Past bookings can't be modified"})
          }    
          
          const getCurrentBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            [Op.and]: [ {startDate: {[Op.lt]: endDate}}, {endDate: {[Op.gt]: startDate}} ],
            },
        });

    if (getCurrentBookings.length) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: res.statusCode,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    };

        if (currentUserId === booking.dataValues.userId) {
            updatedBooking = booking.set({
                id: id,
                spotId: spotId,
                userId: userId,
                startDate: startDate,
                endDate: endDate,
                createdAt: createdAt,
                updatedAt: updatedAt
            })
            res.json(updatedBooking)
        }
    }
);

// delete an existing booking

router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res) => {
        const currentUser = req.user.id;
        const bookingId = req.params.bookingId;
        const booking = await Booking.findByPk(bookingId, {
            where: {
                userId: currentUser
            },
            include: [{model: Spot}]
        });
        
        if (!booking) {
            res.status(404).json({message: "Booking couldn't be found"})
        }
        startDate = new Date(booking.dataValues.startDate)
        endDate = new Date(booking.dataValues.endDate)
        if (startDate < new Date() && endDate > new Date()) {
            res.status(403).json({message: "Bookings that have been started can't be deleted"})
        }

        const ownerId = booking.dataValues.Spot.dataValues.ownerId;
        if (booking.dataValues.userId === currentUser || ownerId === currentUser) {
            booking.destroy();
            res.json({message: "Successfully deleted"})
        }  
    }
);








module.exports = router;