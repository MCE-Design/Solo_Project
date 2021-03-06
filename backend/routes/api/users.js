const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Booking } = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validate Signup Middleware
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('userName')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('userName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign Up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, userName } = req.body;
    const user = await User.signup({ email, userName, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/', asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findAll({

  });

  return res.json(user)
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findAll({
    where: {
      id
    }
  });

  return res.json(user)
}));

router.get(
  '/:id/booking',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const allUserBookings = await Booking.findAll({
      where: {
        userId
      }
    })
    return res.json({
      allUserBookings,
    })
  })
)

module.exports = router;
