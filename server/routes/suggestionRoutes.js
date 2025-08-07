const express = require("express");
const router = express.Router();
const {
  addSuggestion,
  getAllSuggestions,
} = require("../controller/suggestionController");

router.post("/", addSuggestion);
router.get("/all", getAllSuggestions);

module.exports = router;
