const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('firstName')
     .exists({ checkFalsy: true })
     .withMessage('First Name is required'),
    check('lastName')
     .exists({ checkFalsy: true })
     .withMessage('last Name is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post("/sign-up", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const emailChecker = await User.findOne({
    where: { email }
  })

  if (emailChecker) {
    res.status(403);
    res.json({
      message: "User already exists!",
      statusCode: 403,
      errors: {
        email: "User with that email already exists"
      }
    })
  }

const user = await User.signup({ firstName, lastName, email, username, password});
const token = await setTokenCookie(res, user);

  return res.json({user, token});
});

// Get the Current User
router.get("/current-user", requireAuth, async (req, res) => {
  const user = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };
  return res.json(user);
});



module.exports = router;
