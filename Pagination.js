import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pages, page, keyword = '', genre = '' }) => {
  const searchParams = keyword ? `/search/${keyword}` : '';
  const genreParams = genre ? `&genre=${genre}` : '';

  return (
    pages > 1 && (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={`/books${searchParams}/page/${x + 1}${genreParams}`}
              className={`px-4 py-2 border rounded ${
                x + 1 === page
                  ? 'bg-red-700 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {x + 1}
            </Link>
          ))}
        </nav>
      </div>
    )
  );
};

export default Pagination;