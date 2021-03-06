const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Op} = require('sequelize')
const {Spot, Image, User, Review, Booking} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//GET ALL BOOKINGS FOR TESTING PURPOSES
router.get('/', async (req, res) => {
  const allBookings = await Booking.findAll()
  res.json(allBookings)
})


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
    if (!bookings) {
     return res.status(404).json({
        "message": "Sorry, you don't have any current bookings at the moment"
      })
    }

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


//create a booking for a spot based on a spots id
router.post('/spot/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const {startDate, endDate} = req.body

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
   return res.status(404).json({
      "message": "Spot couldn't be found!"
    });
  }

  if (req.user.id === spot.ownerId) {
    return res.status(403).json({
      "message": "Forbidden",
      "statusCode": 403
    });
  }

  if (endDate <= startDate) {
    return res.status(400).json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    });
  }

  let currentBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [{
        startDate: {
          [Op.lte]: endDate
          },
        }, {
        endDate: {
          [Op.gte]: startDate
          }
        }],
    }
  });

  if (currentBookings.length) {
    return res.status(403).json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  let booking = await Booking.create({startDate, endDate, spotId, userId: req.user.id});
  booking = await Booking.findByPk(booking.id);
  return res.json(booking);
});



//EDIT A BOOKING
router.put('/:id', requireAuth, async (req, res) => {

    const {startDate, endDate} = req.body


    const bookings = await Booking.findOne({
        where: {
         id: req.params.id
        }
      }
    );

      //404 error done
    if (!bookings) {
    return res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }

   if (bookings.userId !== req.user.id) {
    return res.status(403).json({
      "message": "Forbidden",
      "statusCode": 403
    })
   }


    if (new Date(bookings.endDate) < new Date() ) {
      return res.status(400).json({
        "message": "Past bookings can't be modified",
        "statusCode": 400
      })
    }



    bookings.startDate = startDate
    bookings.endDate = endDate

    await bookings.save()
    return res.json(bookings)
})


router.delete('/:bookingId', requireAuth, async (req, res) => {
  let bookingId = req.params.bookingId;
  let currentUserId = req.user.id;

  let currentBooking = await Booking.findByPk(bookingId);
  if (!currentBooking) {
      res.status(404);
      return res.json({
          "message": "Booking could not be found",
          "statusCode": 404
      })
  }

  let spot = await Spot.findByPk(currentBooking.spotId)
  if (currentBooking.userId !== currentUserId && spot.ownerId !== currentUserId){
      res.status(403);
      return res.json({
          "message": "Forbidden",
          "statusCode": 403
      })
  }

  if (new Date(currentBooking.startDate) < Date.now()) {
      res.status(400);
      return res.json({
          "message": "You cannot delete a past or current booking",
          "statusCode": 400
      });
  }

  await currentBooking.destroy({
      where: {
          id: bookingId
      }
  })

  return res.json({
      message: "Successfully deleted",
      statusCode: 200
  })

})




module.exports = router
