const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Spot } = require("../../db/models");
const { Image } = require("../../db/models");
const { Booking } = require("../../db/models");
const { Review } = require("../../db/models");

// Add back for validations if I get to create/delete/edit spots
// const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Validate Booking Middleware
const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Please select a check in date.'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('Please select a check out date.'),
  handleValidationErrors,
];


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
  validateBooking,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, userId, startDate, endDate } = req.body;
    console.log(req.body)
    const booking = await Booking.create({ spotId, userId, startDate, endDate });
    return res.json({
      booking,
    });
  }),
);

/* CHECK ALL Bookings for a SPOT */
router.get(
  '/:id/booking',
  asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const allBookings = await Booking.findAll({
      where: {
        spotId
      }
    })
    console.log(allBookings)
    return res.json({
      allBookings,
    })
  })
)


/* DELETE Booking */
router.delete(
  '/booking/:id',
  // validateBookingDelete,
  requireAuth,
  asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
    console.log("HIT", req.params.id)
    console.log("BookingId", bookingId)
    const foundBooking = await Booking.findByPk(bookingId);
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


/* GET ALL Reviews for a SPOT*/
router.get(
  '/:id/reviews',
  asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const allReviews = await Review.findAll({
      where: {
        spotId
      },
      order: [
        ['createdAt', 'DESC']
    ],
    })
    console.log(allReviews)
    return res.json({
      allReviews,
    })
  })
)


/* ADD Review */
router.post(
  '/:id/reviews',
  // validateReview,
  // requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, spotId, review } = req.body;
    console.log(req.body);
    const newReview = await Review.create({ userId, spotId, review });
    return res.json({
      newReview,
    })
  })
)


/* EDIT Review */
router.put(
  '/reviews/:id',
  // validateReview,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, spotId, review } = req.body;
    const id = req.params.id;
    console.log(req.body);
    const editedReview = await Review.update(
      {
       userId,
       spotId,
       review
      },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );
    console.log("editedReview", editedReview);
    return res.json({
      editedReview,
    })
  })
)


/* DELETE Review */
router.delete(
  '/reviews/:id',
  // validateReviewDelete,
  // requireAuth,
  asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    console.log("HIT", req.params.id)
    console.log("reviewId", reviewId)
    const foundReview = await Review.findByPk(reviewId);
    if (!foundReview) throw new Error('Cannot find review');
    const destroyedReview = await Review.destroy({
      where: {
        id: reviewId
      }
    });
    console.log("DESTROYED", reviewId)
    return res.json({
      destroyedReview
    });
  })
)

module.exports = router;
