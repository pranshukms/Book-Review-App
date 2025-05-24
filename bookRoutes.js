const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require("express-validator");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
const Book = require("../models/Book");

router.get('/featured', async (req, res) => {
  console.log("DB STATE:", mongoose.connection.readyState);
  console.log("TEST 1: Route reached");
  try {
    console.log("TEST 2: Trying query");
    const books = await Book.find({ isFeatured: true }).limit(3);
    console.log("TEST 3: Query succeeded", books);
    res.json(books);
  } catch (err) {
    console.log("TEST 4: FAILED", err);
    res.status(500).json({ error: err.message });
  }
});

// Public routes
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.get("/:id/reviews", bookController.getBookReviews);

// Protected routes
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.admin,
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("publishedYear", "Published year is required").isNumeric(),
  ],
  bookController.createBook
);

router.post(
  "/:id/reviews",
  authMiddleware.protect,
  [
    check("rating", "Rating is required").isInt({ min: 1, max: 5 }),
    check("text", "Review text is required").not().isEmpty(),
  ],
  bookController.createReview
);



router.get("/", async (req, res) => {
  console.log('hello');
  try {
    const books = await Book.find({});
    res.json(books);
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
