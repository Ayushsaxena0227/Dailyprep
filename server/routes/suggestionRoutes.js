const express = require("express");
const router = express.Router();
const {
  addSuggestion,
  getAllSuggestions,
} = require("../controller/suggestionController");

/**
 * @swagger
 * tags:
 *   name: Suggestions
 *   description: User suggestions/feedback APIs
 */

/**
 * @swagger
 * /suggestion:
 *   post:
 *     summary: Naya suggestion submit karo
 *     tags: [Suggestions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rahul"
 *               email:
 *                 type: string
 *                 example: "rahul@gmail.com"
 *               message:
 *                 type: string
 *                 example: "Please add more DSA questions"
 *     responses:
 *       201:
 *         description: Suggestion submit ho gaya
 *       400:
 *         description: Message required hai
 */
router.post("/", addSuggestion);

/**
 * @swagger
 * /suggestion/all:
 *   get:
 *     summary: Saare suggestions fetch karo (Admin only)
 *     tags: [Suggestions]
 *     responses:
 *       200:
 *         description: Saare suggestions mil gaye
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/all", getAllSuggestions);

module.exports = router;
