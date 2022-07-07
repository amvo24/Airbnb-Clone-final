const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Spot, Image, User, Review, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSpots = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('State is required'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required'),
  check('lat')
    .exists({checkFalsy: true})
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({checkFalsy: true})
    .withMessage('Longitude is not valid'),
  check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Price per day is required'),
  handleValidationErrors
];

// GET all spots
router.get('/', async (req,res) => {
    const spots = await Spot.findAll();

     res.json(spots);
})

// GET all spots owned by the current user !!!!
router.get('/userSpots', requireAuth, async (req, res) => {
    const { id } = req.user

      const places = await Spot.findAll({
          where: {ownerId: id}
      });
  res.json(places[0])
});

// GET details by spot id
router.get('/:id', async (req,res) => {
  const spots = await Spot.findByPk(req.params.id, {
    include: [
        {
          model: Image,
          as: 'images',
          attributes: ['url']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
      }]
  });

  if (!spots) {
    res.status(404)
    res.json({message: "Spot couldn't be found", statusCode: 404})
  }
  const reviewsAggData = await Spot.findByPk(req.params.id, {
    include: {
        model: Review,
        attributes: []
    },
    attributes: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'numReviews'],
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
      ],
    raw: true
});

const spotData = spots.toJSON()
spotData.numReviews = reviewsAggData.numReviews
spotData.avgStarRating = reviewsAggData.avgStarRating


  res.json(spotData)
})


  //Create a new Spot !!!!!!! take out in body and put in back end??
  router.post('/', requireAuth, async (req, res) => {
   let {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body

   const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
   })

   res.json({message: 'Successfully created spot', newSpot})
 })

 // Edit a spot !!!!
 router.put('/:id', requireAuth, validateSpots, async (req, res) => {
  let {address, city, state, country, lat, lng, name, description, price} = req.body
    const spots = await Spot.findByPk(req.params.id, {
      where: {
        ownerId: req.params.id
      }
    })

    if(!spots || spots !== req.user) {
      res.status(404)
      res.json( {
        message: "invalid ownerId"
      })
    }
         spots.ownerId = ownerId
         spots.address = address
         spots.city = city
         spots.state = state
         spots.country = country
         spots.lat = lat
         spots.lng = lng
         spots.name = name
         spots.description = description
         spots.price = price

      await spots.save()
      return res.json(spots)
  })


 //delete spot
  router.delete('/:id', async (req, res) => {
    const spots = await Spot.findByPk(req.params.id);

     res.json({
        message: "Successfully deleted",
        statusCode: 200
      })

    if(!spots) {
       res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }

    spots.destroy()
    spots.save()
})

module.exports = router
