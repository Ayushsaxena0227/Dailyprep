const express = require("express");
const router = express.Router();
const {
  getTodayQuestions,
  addQuestions,
  getAllQuestions,
} = require("../controller/questionController");
router.get("/all", getAllQuestions);
router.get("/today", getTodayQuestions);
router.post("/add", addQuestions);
module.exports = router;
