import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getBookById, 
  getBookReviews 
} from '../features/books/bookSlice';
import { createReview } from '../features/reviews/reviewSlice';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../style.css';
import '../index.css';

const BookPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { currentBook, loading: bookLoading, error: bookError } = useSelector(
    (state) => state.books
  );
  
  const { reviewsByBook, loading: reviewLoading, error: reviewError } = useSelector(
    (state) => state.reviews
  );
  
  const { userInfo } = useSelector((state) => state.auth);
  
  const reviews = reviewsByBook[id] || [];
  
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getBookById(id));
    dispatch(getBookReviews(id));
  }, [dispatch, id, reviewSubmitted]);

  const reviewSchema = Yup.object().shape({
    rating: Yup.number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5'),
    text: Yup.string()
      .required('Review text is required')
      .min(10, 'Review must be at least 10 characters')
  });

  const submitReview = (values, { resetForm }) => {
    dispatch(createReview({ bookId: id, reviewData: values }))
      .unwrap()
      .then(() => {
        setReviewSubmitted(true);
        resetForm();
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      })
      .finally(() => {
        setReviewSubmitted(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {bookLoading ? (
        <Loader />
      ) : bookError ? (
        <Message variant="danger">{bookError.message || 'Error loading book'}</Message>
      ) : currentBook ? (
        <>
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3">
              <img 
                src={currentBook.coverImage || '/images/default-cover.jpg'} 
                alt={currentBook.title} 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{currentBook.title}</h1>
              <h2 className="text-xl text-gray-600 mb-4">by {currentBook.author}</h2>
              
              <div className="flex items-center mb-4">
                <Rating value={currentBook.averageRating} />
                <span className="ml-2 text-gray-600">
                  ({currentBook.averageRating ? currentBook.averageRating.toFixed(1) : 'No ratings'})
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {currentBook.genre.map((g, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-4">Published: {currentBook.publishedYear}</p>
              
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p>{currentBook.description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            
            {reviewLoading ? (
              <Loader />
            ) : reviewError ? (
              <Message variant="danger">{reviewError.message || 'Error loading reviews'}</Message>
            ) : reviews.length === 0 ? (
              <Message>No reviews yet. Be the first to review!</Message>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard 
                    key={review._id} 
                    review={review} 
                    onDelete={() => {}} // Implement delete functionality if needed
                  />
                ))}
              </div>
            )}
            
            {userInfo ? (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                
                <Formik
                  initialValues={{ rating: 0, text: '' }}
                  validationSchema={reviewSchema}
                  onSubmit={submitReview}
                >
                  {({ setFieldValue, values }) => (
                    <Form>
                      <div className="mb-4">
                        <label className="block mb-2">Rating</label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setFieldValue('rating', star)}
                              className="text-2xl focus:outline-none"
                            >
                              {values.rating >= star ? (
                                <span className="text-yellow-500">★</span>
                              ) : (
                                <span className="text-gray-400">☆</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="text" className="block mb-2">Review</label>
                        <Field
                          as="textarea"
                          name="text"
                          rows="4"
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <ErrorMessage name="text" component="div" className="text-red-500 text-sm" />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={reviewSubmitted}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {reviewSubmitted ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <Message>
                Please <a href="/login" className="text-red-600">login</a> to write a review.
              </Message>
            )}
          </div>
        </>
      ) : (
        <Message variant="danger">Book not found</Message>
      )}
    </div>
  );
};

export default BookPage;