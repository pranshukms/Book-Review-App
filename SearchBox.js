import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/books/search/${keyword}`);
    } else {
      navigate('/books');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search books..."
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-700 text-white rounded-r-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;