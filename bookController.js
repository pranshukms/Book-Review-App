const Book = require('../models/Book');
const Review = require('../models/Review');

// Get all books with pagination
exports.getBooks = async (req, res) => {
  try {
    console.log('hello');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Search and filter options
    const search = req.query.search || '';
    const genre = req.query.genre || '';
    
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (genre) {
      query.genre = genre;
    }
    
    const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const totalBooks = await Book.countDocuments(query);
    
    res.json({
      books,
      page,
      pages: Math.ceil(totalBooks / limit),
      totalBooks
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a book (admin only)
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishedYear, coverImage } = req.body;
    
    const book = new Book({
      title,
      author,
      description,
      genre: Array.isArray(genre) ? genre : [genre],
      publishedYear,
      coverImage: coverImage || 'default-cover.jpg'
    });
    
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get book reviews
exports.getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      user: req.user.id,
      book: req.params.id
    });
    
    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this book' });
    }
    
    const review = new Review({
      user: req.user.id,
      book: req.params.id,
      rating,
      text
    });
    
    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};