const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const bookData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Classic", "Fiction"],
    publishedYear: 1925,
    averageRating: 4.5,
    isFeatured: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful story of racial injustice and moral growth.",
    coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Classic", "Drama"],
    publishedYear: 1960,
    averageRating: 4.8,
    isFeatured: true
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism and surveillance.",
    coverImage: "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Dystopian", "Political Fiction"],
    publishedYear: 1949,
    averageRating: 4.7,
    isFeatured: true
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "Romantic novel about the emotional development of Elizabeth Bennet.",
    coverImage: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Romance", "Classic"],
    publishedYear: 1813,
    averageRating: 4.6
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "Fantasy novel about Bilbo Baggins' adventurous quest.",
    coverImage: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Adventure"],
    publishedYear: 1937,
    averageRating: 4.7
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "First book in the Harry Potter fantasy series.",
    coverImage: "https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Young Adult"],
    publishedYear: 1997,
    averageRating: 4.8,
    isFeatured: true
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "Story of teenage alienation and rebellion.",
    coverImage: "https://m.media-amazon.com/images/I/61fgOuZfBGL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Literary Fiction", "Coming-of-Age"],
    publishedYear: 1951,
    averageRating: 4.0
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "Epic fantasy adventure about the quest to destroy the One Ring.",
    coverImage: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Fantasy", "Adventure"],
    publishedYear: 1954,
    averageRating: 4.9,
    isFeatured: true
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "Philosophical novel about a shepherd's journey to find treasure.",
    coverImage: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Philosophical Fiction", "Fantasy"],
    publishedYear: 1988,
    averageRating: 4.3
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description: "Mystery thriller about a symbologist's quest.",
    coverImage: "https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg",
    genre: ["Mystery", "Thriller"],
    publishedYear: 2003,
    averageRating: 4.0
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    // Insert new data
    await Book.insertMany(bookData);
    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
};

seedDB();