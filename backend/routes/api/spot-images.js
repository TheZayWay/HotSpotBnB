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
        const spotImageId = req.params.imageId;
        console.log(spotImageId)
        const spotImage = await SpotImage.findByPk(spotImageId,{
            include: [{
                model: Spot,
                where: {
                    ownerId: currentUser
                }
            }]
        });
        if (!spotImage) {
            res.status(404).json({message: "Spot Image couldn't be found"})
        } else {
            spotImage.destroy();
            res.json({message: "Successfully deleted"})
        }
    }
);



module.exports = router;