import React, { useState, useEffect } from "react";
import { fetchFeaturedBooks } from "../services/api";
import "../style.css";
import "../index.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getBooks } from "../features/books/bookSlice";
// import BookCard from "../components/BookCard";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { featuredBooks } from "../data/books";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchFeaturedBooks();
        setBooks(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  if (loading) return <div className="text-center py-8">Loading books...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!books.length)
    return <div className="text-center py-8">No featured books found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-800 text-center mb-8">Featured Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">by {book.author}</p>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(book.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">({book.rating})</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {book.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-300 hover:cursor-pointer text-red-800 text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 line-clamp-2">{book.description}</p>

              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p className="font-bold">Error loading featured books</p>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
