const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('email: Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('password: Password is required'),
  handleValidationErrors
];

// Log in
router.post('/log-in', validateLogin, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      //err.title = 'Login failed';
      //err.errors = ['The provided email is invalid.'];
      return next(err);
    }

    const token = await setTokenCookie(res, user)
    const userRes = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      token: token,
    };
    return res.json(userRes);
  }
);

router.get('/', restoreUser, (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
);
// Log out
router.delete('/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);





module.exports = router;
