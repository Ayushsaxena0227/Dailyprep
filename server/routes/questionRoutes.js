const express = require("express");
const router = express.Router();
const {
  getTodayQuestions,
  addQuestions,
} = require("../controller/questionController");

router.get("/today", getTodayQuestions);
router.post("/add", addQuestions);
module.exports = router;
