const express = require('express');
const {requireAuth } = require('../../utils/auth');
const {Spot, Image, User, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// GET all reviews of the current user
router.get('/users/:userId', requireAuth, async (req, res) => {
    const {userId} = req.user
    const review = await Review.findAll({
        where: {id: userId}
    })
    res.json(review)
})









module.exports = router
