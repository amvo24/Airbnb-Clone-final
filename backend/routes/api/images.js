const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Spot, Image, User, Review, Booking} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Add an Image to a Spot based on the Spot's id
router.post('/spots/:spotId', requireAuth, async (req, res) => {

  const spotId = req.params.spotId;

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  } else if (spot.ownerId !== req.user.id) {
     return res.status(403).json({
      message: "Forbidden. Spot must belong to the current user",
      statusCode: 403
    })
  }

  let { url } = req.body

  const newImage = await Image.create({
    imageableId: spot.ownerId,
    imageableType: "Spot",
    url
  })

  res.json(newImage)
})

//Add an Image to a Review based on the Review's id
router.post('/review/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);
  let allReviews = await Image.findAll({where: {imageableType: "Review"}})

  if (allReviews.length > 10) {
    return res.status(400).json({
        message: "Maximum number of images for this resource was reached",
        statusCode: 400
    })
  } else if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    });
  } else if (review.userId !== req.user.id) {
    return res.json ({
      message: "Forbidden",
      statusCode: 403
    })
  }

  let { url } = req.body
  const newImage = await Image.create({
    imageableId: review.userId,
    imageableType: "Review",
    url
  })

  res.json(newImage)
})

//Delete an Image
router.delete('/:id', requireAuth, async (req, res) => {

  const images = await Image.findByPk(req.params.id);

  if (!images) {
  res.status(404)
    res.json({
      message: "Image couldn't be found",
      statusCode: 404
    })
  } else if (images.imageableId !== req.user.id) {
   res.status(403)
    res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  images.destroy()
  images.save()

  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

module.exports = router
