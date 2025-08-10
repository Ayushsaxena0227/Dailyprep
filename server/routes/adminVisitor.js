const express = require("express");
const router = express.Router();
const { getVisitorStats } = require("../controller/visitController");

router.get("/", getVisitorStats);

module.exports = router;
