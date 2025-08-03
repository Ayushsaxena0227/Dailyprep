const express = require("express");
const router = express.Router();
const { getTodayQuestions } = require("../controller/questionController");

router.get("/today", getTodayQuestions);
module.exports = router;
