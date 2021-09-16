const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Spot } = require("../../db/models");
const { Image } = require("../../db/models");

// Add back for validations if I get to create/delete/edit spots
// const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


/* GET Spots */
router.get('/', asyncHandler(async (req, res) => {

  const spots = await Spot.findAll({
    // order: [['createdAt', 'DESC']],
    // include: [User],
    limit: 15
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

module.exports = router;
