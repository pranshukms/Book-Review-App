import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooks } from '../features/books/bookSlice';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBox from '../components/SearchBox';
import Pagination from '../components/Pagination';
import '../style.css';
import '../index.css';

const BookListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword, pageNumber = 1 } = useParams();
  
  const [genre, setGenre] = useState('');
  
  const { books, page, pages, totalBooks, loading, error } = useSelector(
    (state) => state.books
  );
  
  const genres = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
    'Mystery', 'Romance', 'Thriller', 'Biography', 'History'
  ];

  useEffect(() => {
    dispatch(getBooks({ 
      page: pageNumber, 
      limit: 8, 
      search: keyword || '',
      genre: genre || ''
    }));
  }, [dispatch, keyword, pageNumber, genre]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-4xl font-bold mb-4 md:mb-0">All Books</h2>
        <SearchBox />
      </div>
      
      <div className="mb-6">
        <label className="mr-2">Filter by Genre:</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message || 'Error loading books'}</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          
          <Pagination 
            pages={pages} 
            page={page} 
            keyword={keyword ? keyword : ''} 
            genre={genre ? genre : ''}
          />
          
          <div className="mt-4 text-gray-600">
            Showing {books.length} of {totalBooks} books
          </div>
        </>
      )}
    </div>
  );
};

export default BookListPage;