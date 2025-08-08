const express = require("express");
const router = express.Router();
const { getStats } = require("../controller/adminController");
const verifyAdmin = require("../Middlewares/verifyAdmin");

router.use(verifyAdmin);
router.get("/stats", getStats);

module.exports = router;
