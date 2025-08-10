const express = require("express");
const router = express.Router();
const { logVisitor } = require("../controller/visitController");

router.post("/", logVisitor);

module.exports = router;
