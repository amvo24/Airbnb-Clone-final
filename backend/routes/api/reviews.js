const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Spot, Image, User, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


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
            }
        ],

      where: { userId: id }
    });
    res.json(reviews[0])
  });









module.exports = router
