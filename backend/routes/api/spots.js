const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Spot } = require("../../db/models");
const { Image } = require("../../db/models");
const { Booking } = require("../../db/models");

// Add back for validations if I get to create/delete/edit spots
// const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Validate Booking Middleware
// const validateBooking = [
//   check('startDate')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a valid email.'),
//   check('endDate')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage('Please provide a username with at least 4 characters.'),
//   handleValidationErrors,
// ];


/* GET Spots */
router.get('/', asyncHandler(async (req, res) => {

  const spots = await Spot.findAll({
    // order: [['createdAt', 'DESC']],
    // include: [User],
    limit: 15
  });

  return res.json(spots)
}));

/* GET One Spot */
router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id
  const spots = await Spot.findAll({
    where: {
      id
    }
  });

  return res.json(spots)
}));

/* GET Images */
router.get('/:id/images', asyncHandler(async (req, res) => {
  const spotId = req.params.id
  const images = await Image.findAll({
    where: {
      spotId
    }
  });

  return res.json(images)
}));

/* BOOK Spot */
router.post(
  '/:id/booking',
  // validateBooking,
  asyncHandler(async (req, res) => {
    const { spotId, userId, startDate, endDate } = req.body;
    console.log(req.body)
    const booking = await Booking.create({ spotId, userId, startDate, endDate });
    return res.json({
      booking,
    });
  }),
);

/* DELETE Booking */
router.delete(
  '/booking/:id',
  // validateBookingDelete,
  asyncHandler(async (req, res) => {
    const bookingId = req.params.id
    console.log("HIT", req.params.id)
    console.log("BookingId", bookingId)
    const foundBooking = Booking.findByPk(bookingId);
    if (!foundBooking) throw new Error('Cannot find booking');
    const destroyedBooking = await Booking.destroy({
      where: {
        id: bookingId
      }
    });
    console.log("DESTROYED", bookingId)
    return res.json({
      destroyedBooking
    });
  })
)

// router.get('/new', csrfProtection, asyncHandler(async (req, res) => {
//   if (!res.locals.authenticated) {
//     return res.redirect('/users/login');
//   }
//   const userId = res.locals.user.dataValues.id
//   const post = await Pawst.build();
//   return res.render('new-pawst', {
//     title: 'New Pawst',
//     post,
//     csrfToken: req.csrfToken(),
//     userId
//   });
// }));

module.exports = router;
