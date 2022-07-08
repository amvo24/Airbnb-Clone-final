const express = require('express');
const {requireAuth } = require('../../utils/auth');

const {Spot, Image, User, Review, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

// GET all reviews of the current user
router.get('/user-reviews', requireAuth, async (req, res) => {
    const { id } = req.user
    console.log(id)
    const reviews = await Review.findAll({
        include: [
            {
                model: Spot
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
              model: Image,
              as: 'images',
              attributes: ['url']
            }
        ],
      where: { userId: id }
    });
    res.json(reviews[0])
});

// GET all reviews by a Spot's Id
// router.get('/:spotId/reviews', async (req, res) => {
//     const spotId = req.params.spotId;

//     let spot = await Spot.findByPk(spotId);

//     if (!spot) {
//       return res.status(404).json({
//         "message": "Spot does not exist!",
//         "statusCode": 404
//       });
//     }

//     let reviews = await Review.findAll({
//       where: {
//         spotId: spotId,
//       }
//     });

//     return res.json(reviews);
// });


router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;

  let spot  = await Spot.findByPk(spotId);
  //if spot doesnt exist
  if (!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  let reviews = await Review.findAll({
    where: {
      spotId: spotId,
    }, include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Image,
        as: 'images',
        attributes: ['url']
      },
    ]
  });



  return res.json({
    reviews
  });
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId', requireAuth, validateReview, async (req, res) => {
    let { review, stars } = req.body
    const spotId = req.params.spotId
    const id = req.user.id

    const spot = await Spot.findOne({
        where: { id: spotId}
    })
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const user = await Review.findOne({
        where:{ userId: id, spotId: spotId}
    })

    if (user) {
        res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    if (stars > 5 || stars < 0) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5"
            }
        })
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId: spotId,
      review,
      stars,
    })


    res.json({ message: 'Successfully created spot', newReview})
})

// Edit a review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
        const { stars } = req.body
        let reviewId = req.params.reviewId;
        let reviewParams = req.body;
        let currentUserId = req.user.id;

        if (stars > 5 || stars < 0) {
            return res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "stars": "Stars must be an integer from 1 to 5"
                }
            })
        }


        let review = await Review.findByPk(reviewId);
        if(!review) {
            res.status(404).json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
        }

        review = await Review.update(reviewParams, {
          where: {
            id: reviewId
          }
        });
        review = await Review.findByPk(reviewId);
        return res.json(review);
});

// // DELETE a review
// router.delete('/:reviewId', requireAuth, async (req, res) => {
//     const reviewId = req.params.reviewId
//     const review = await Review.findOne({
//         where: {id: reviewId}
//     })

//     if(!review) {
//         res.status(404).json({
//             "message": "Review couldn't be found",
//             "statusCode": 404
//         })
//     }

//     review.destroy()
//     review.save()

// })
//delete a review

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const id = req.user.id

    const review = await Review.findOne({
      where: {id : reviewId}
    })

    if (review.userId !== id ) {
      res.status(403);
      res.json({
        "message": "Authorization Error"
      })
    }

    if (!review) {
      res.status(404);
      res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
    }

    await review.destroy();
    await review.save();

    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  })


module.exports = router
