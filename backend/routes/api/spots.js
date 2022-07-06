const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Spot, Image, User} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


// GET all spots
router.get('/', async (req,res) => {
    const spots = await Spot.findAll();

     res.json(spots);
  })

// GET all spots based on user id
router.get('/userSpots', requireAuth, async (req, res) => {
    const { id } = req.user

      const places = await Spot.findAll({
          where: {ownerId: id}
      });
  res.json(places[0])
});

//find all spots by id
router.get('/:id', async (req,res) => {
    const spots = await Spot.findByPk(req.params.id);


     if (!spots) {
      res.status(404)
      res.json({message: "Spot couldn't be found", statusCode: 404})
     }

     res.json({spots})
  })


  //Create a new Spot
  router.post('/', requireAuth, async (req, res) => {
   let {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body

   const newSpot = await Spot.create({
    ownerId,
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

//  // Edit a spot
//  router.put('/:id', async (req, res) => {
//   let {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body
//     const edit = await Spot
//  })

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
