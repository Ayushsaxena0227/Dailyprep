const express = require("express");
const router = express.Router();
const {
  getTodayQuestions,
  addQuestions,
  getAllQuestions,
} = require("../controller/questionController");

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management APIs
 */

/**
 * @swagger
 * /questions/all:
 *   get:
 *     summary: Saare questions fetch karo
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Saare questions mil gaye
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/all", getAllQuestions);

/**
 * @swagger
 * /questions/today:
 *   get:
 *     summary: Aaj ke questions fetch karo
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Today's questions mil gaye
 *       404:
 *         description: Aaj ke liye koi question nahi mila
 */
router.get("/today", getTodayQuestions);

/**
 * @swagger
 * /questions/add:
 *   post:
 *     summary: Naya question add karo
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is React?"
 *               answer:
 *                 type: string
 *                 example: "React ek JavaScript library hai"
 *               category:
 *                 type: string
 *                 example: "Frontend"
 *     responses:
 *       201:
 *         description: Question add ho gaya
 *       400:
 *         description: Invalid data
 */
router.post("/add", addQuestions);

module.exports = router;
