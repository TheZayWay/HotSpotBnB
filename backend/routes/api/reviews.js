const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, User, ReviewImage, SpotImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleSpotValidationErrors } = require('../../utils/validation');

//Get all Reviews of current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        
        const reviews = await Review.findAll({
            where: {
                userId: userId
            },
            include: [
                {model: User, attributes: ["id", "firstName", "lastName"]},
                {
                    model: Spot,
                    attributes: {exclude: ["description", "createdAt", "updatedAt"]},
                    include: [{ model: SpotImage, attributes: ["url"]}]
                },
                {model: ReviewImage, attributes: ["id", "url"]}           
            ]
        });
       
        const mappedReviews = reviews.map(review => {
            const spot = review.Spot;
            const spotImages = spot.SpotImages;
          
            if (spotImages && spotImages.length > 0) {
              spot.dataValues.previewImage = spotImages[0].url;
            } else {
              spot.dataValues.previewImage = null;
            }
          
            return review;
          });
          delete reviews[0].dataValues.Spot.dataValues.SpotImages;
        res.json({reviews})
    });





    


    

module.exports = router;
