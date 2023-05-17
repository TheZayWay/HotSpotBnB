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
        return res.json({reviews})
    });

    //Add an Image to Review based on Reviews Id

    router.post(
        '/:reviewId/images',
        requireAuth,
        async (req, res) => {
            const reviewId = req.params.reviewId;
            const userId = req.user.id;
            const { url } = req.body;
            const review = await Review.findByPk(reviewId, {
                where: {
                    userId: userId
                }
            })
            if (!review) {
                res.status(404).json({message: "Review couldn't be found"})
            }
            const reviewImages = await ReviewImage.findAll();
            if (reviewImages.length > 10) {
                res.status(403).json({message: "Maximum number of images for this resource was reached"})
            } else {
                const newReviewImage = await ReviewImage.create({reviewId, url });
                delete newReviewImage.dataValues.reviewId;
                delete newReviewImage.dataValues.updatedAt;
                delete newReviewImage.dataValues.createdAt;
                return res.json(newReviewImage)
            }
            
            
        }
    )


    


    

module.exports = router;
