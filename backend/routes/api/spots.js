const express = require('express');
const {requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
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

    let { page, size, maxLat, minLat, minLng, maxLng, maxPrice, minPrice} = req.query;
    page = Number(page)
    size = Number(size)

  if (isNaN(page)) {
      page = 0
  }
  if (isNaN(size)) {
      size = 20
  }

  if (size > 20) {
      size = 20
  }
  if (page > 10) {
      page = 10
  }
const error = {
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {}
  }


  if (page < 0) {
    error.errors.page = "Page must be greater than or equal to 0"
  }
  if (size < 0) {
    error.errors.size = "Size must be greater than or equal to 0"
  }
  if (+maxLat > 90) {
    error.errors.maxLat = "Maximum latitude is invalid"
  }
  if (+minLat < -90) {
    error.errors.minLat = "Minimum latitude is invalid"
  }
  if (+minLng < -180) {
    error.errors.minLng = "Maximum longitude is invalid"
  }
  if (+maxLng > 180) {
    error.errors.maxLng = "Minimum longitude is invalid"
  }
  if (Number(minPrice) < 0) {
    error.errors.minPrice = "Minimum price must be greater than 0"
  }
  if (Number(maxPrice) < 0) {
    error.errors.maxPrice = "Maximum price must be greater than 0"
  }

if (page < 0 || size < 0 || +maxLat > 90 || +minLng < -180 || +maxLng > 180 || Number(maxPrice) < 0 || Number(minPrice) < 0) {
  return res.status(400).json(error)
}
  const options = []
  if (maxLat) {options.push({lat: {[Op.lte]: Number(maxLat)}})}
  if (minLat) {options.push({lat: {[Op.gte]: Number(minLat)}})}
  if (maxLng) {options.push({lng: {[Op.lte]: Number(maxLng)}})}
  if (minLng) {options.push({lng: {[Op.gte]: Number(minLng)}})}
  if (maxPrice) {options.push({price: {[Op.lte]: Number(maxPrice)}})}
  if (minPrice) {options.push({price: {[Op.gte]: Number(minPrice)}})}

  let spots = await Spot.findAll({
    include: [
      {
        model: Review
      }
    ],
    where: {
    [Op.and]: options

},
      limit: size || 20,
      offset: page * size,
  });
  res.json({
      spots,
      page,
      size: size || 20
  });

})




// GET all spots owned by the current user
router.get('/userSpots', requireAuth, async (req, res) => {
    const { id } = req.user

      const places = await Spot.findAll({
          where: {ownerId: id}
      });

  res.json(places)
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


//Create a new Spot
  router.post('/', requireAuth, validateSpots, async (req, res) => {
   let { address, city, state, country, lat, previewImage, lng, name, description, price} = req.body

   const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    previewImage,
    lng,
    name,
    description,
    price
   })

   res.json({message: 'Successfully created spot', newSpot})
})

// Edit a spot !!!!
 router.put('/:id', requireAuth, validateSpots, async (req, res) => {
  let {address, city, state, country, lat, previewImage, lng, name, description, price} = req.body
    const spots = await Spot.findByPk(req.params.id, {
      where: {
        ownerId: req.params.id
      }
    })

    if (!spots) {
      res.status(404)
     return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    } else if (spots.ownerId !== req.user.id) {
      return res.status(403).json({message:"Forbidden. You must be owner to edit this spot"})
    }

         //spots.ownerId = ownerId
         spots.address = address
         spots.previewImage = previewImage
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

    if(!spots) {
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }
     res.json({
        message: "Successfully deleted",
        statusCode: 200
      })


    spots.destroy()
    spots.save()
})




module.exports = router
