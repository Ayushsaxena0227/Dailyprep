const express = require("express");
const {
  logDailyVisit,
  logQuestionCompleted,
  getProgress,
} = require("../controller/progressController");
const router = express.Router();

router.post("/visit", logDailyVisit);
router.post("/questionCompleted", logQuestionCompleted);
router.get("/", getProgress);

module.exports = router;
