const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

router.delete(
    '/:imageId',
    requireAuth,
    async (req,res) => {
        const currentUser = req.user.id;
        const reviewImageId = req.params.imageId;
        
        const reviewImage = await ReviewImage.findByPk(reviewImageId,{
            include: [{
                model: Review,
                where: {
                    ownerId: currentUser
                }
            }]
        });
        if (!reviewImage) {
            res.status(404).json({message: "Review Image couldn't be found"})
        } else {
            reviewImage.destroy();
            res.json({message: "Successfully deleted"})
        }
    }
);


module.exports = router;