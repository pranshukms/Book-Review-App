import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg book-card transition-shadow duration-300">
      <Link to={`/books/${book._id}`}>
        <img 
          src={book.coverImage || '/images/default-cover.jpg'} 
          alt={book.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/books/${book._id}`} className="hover:text-red-800">
          <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        </Link>
        
        <p className="text-gray-600 mb-2">by {book.author}</p>
        
        <div className="flex items-center mb-2">
          <Rating value={book.averageRating} />
          <span className="ml-2 text-gray-600">
            ({book.averageRating ? book.averageRating.toFixed(1) : 'No ratings'})
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {book.genre.map((g, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-300 hover:cursor-pointer text-red-800 text-xs rounded-full"
            >
              {g}
            </span>
          ))}
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2">{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;