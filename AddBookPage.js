import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createBook } from '../features/books/bookSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import '../style.css';
import '../index.css';

const AddBookPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.books);
  const { userInfo } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    description: Yup.string().required('Description is required'),
    genre: Yup.string().required('Genre is required'),
    publishedYear: Yup.number()
      .required('Published year is required')
      .min(1000, 'Invalid year')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    coverImage: Yup.string().url('Invalid URL')
  });

  const submitHandler = (values, { setSubmitting }) => {
    const genres = values.genre.split(',').map(g => g.trim());
    const bookData = { ...values, genre: genres };
    
    dispatch(createBook(bookData))
      .unwrap()
      .then(() => {
        navigate('/');
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  if (!userInfo || !userInfo.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Message variant="danger">You must be an admin to access this page</Message>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 theme1">Add New Book</h1>
      
      {error && <Message variant="danger">{error.message || 'Error adding book'}</Message>}
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md theme">
        <Formik
          initialValues={{
            title: '',
            author: '',
            description: '',
            genre: '',
            publishedYear: '',
            coverImage: ''
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className='theme1'>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 p1">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-4 pt">
                <label htmlFor="author" className="block mb-2 p1">Author</label>
                <Field
                  type="text"
                  name="author"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-4 pt">
                <label htmlFor="description" className="block mb-2 p1">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="w-full p1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-4 pt">
                <label htmlFor="genre" className="block mb-2 p1">Genre (comma separated) </label>
                <Field
                  type="text"
                  name="genre"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="genre" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-4 pt">
                <label htmlFor="publishedYear" className="block mb-2 p1">Published Year</label>
                <Field
                  type="number"
                  name="publishedYear"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="publishedYear" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-6 pt">
                <label htmlFor="coverImage" className="block mb-2 p1">Cover Image URL (optional)</label>
                <Field
                  type="text"
                  name="coverImage"
                  className="w-full p1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="coverImage" component="div" className="text-red-500 text-sm" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? <Loader small /> : 'Add Book'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBookPage;