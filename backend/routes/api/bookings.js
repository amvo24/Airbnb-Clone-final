const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Op} = ('sequelize')
const {Spot, Image, User, Review, Booking} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//GET all of the current users bookings
router.get('/user-bookings', requireAuth, async (req, res) => {
    const { id } = req.user
    const bookings = await Booking.findAll({
       include: [
        {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
        }
       ],
       where: { userId: id}
    })
    res.json(bookings)
})

//GET all bookings for a spot based on the spot's id
router.get('/:spotId', requireAuth, async (req, res) => {

    const ownerBookings = await Booking.findAll({
        where: {spotId: req.params.spotId},
        include: {
            model: User,
            attributes:  ['id', 'firstName', 'lastName']
        }
    })

    const nonOwnerBookings = await Booking.findAll({
        where: {spotId: req.params.spotId},
        attributes: ['spotId', 'startDate', 'endDate']
    })
    const spotId = req.params.spotId;

    const spot  = await Spot.findByPk(spotId);

   if (!spot) {
       res.status(404)
       res.json({
         message: "Spot couldn't be found",
         statusCode: 404
       })

   } else if (spot.ownerId === req.user.id) {
       return res.json({ 'Bookings': ownerBookings })
   } else {
       return res.json({ 'Bookings': nonOwnerBookings })
   }
})

//Create a booking from a Spot based on the spot's id
router.post('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    let { startDate, endDate} = req.body
    const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        startDate,
        endDate,
    })

    // let existingBookings = await Booking.findAll({
    //     where: {
    //       spotId: spotId,
    //       [Op.and]: [{ // (StartDate1 <= EndDate2) and (EndDate1 >= StartDate2)
    //         startDate: {
    //           [Op.lte]: bookingParams.endDate
    //           },
    //         }, {
    //         endDate: {
    //           [Op.gte]: bookingParams.startDate
    //           }
    //         }],
    //     }
    //   });

    res.json(newBooking)

})

//Edit Booking
router.put('/:id', requireAuth, async (req, res) => {

    const {startDate, endDate} = req.body

    const bookings = await Booking.findOne(

      {
        where: {
         id: req.params.id
        }
      }
    );

    // both equal 1
    //console.log(req.params.ownerId)
    if (!bookings || bookings.userId !== req.user.id) {
      res.status(404)
      res.json({
        message: "Review couldn't be found",
        statusCode: 404
      })
    }

    bookings.startDate = startDate
    bookings.endDate = endDate

    await bookings.save()
    return res.json(bookings)
})


// Delete a Booking
router.delete('/:id', requireAuth, async (req, res) => {

    const bookings = await Booking.findByPk(req.params.id);

    if (!bookings || bookings.userId !== req.user.id) {

      res.status(404)
      res.json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }

    bookings.destroy()
    bookings.save()

    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  })




module.exports = router
