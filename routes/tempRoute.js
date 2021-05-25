const express = require("express");
const tempController = require("../controller/tempController");
const validation = require("../middleware/validation-middleware");
const router = express.Router();

router.get(`/getTemp`, validation.temp, tempController.getTemp);
router.get(
  `/getSevenDayForCast`,
  validation.sevenDayForCast,
  tempController.getSevenDayForCast
);

module.exports = router;
