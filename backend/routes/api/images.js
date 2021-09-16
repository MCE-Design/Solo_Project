const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Image } = require("../../db/models")



// Add back for validations if I get to create/delete/edit images
// const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// /* GET Images */
// router.get('/:id', asyncHandler(async (req, res) => {
//   console.log(id)
//   const images = await Image.findAll({
//     // where: {
//     //   spotId: {id}
//     // }
//   });

//   return res.json(images)
// }));

module.exports = router;
