import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../features/auth/authSlice.js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import '../style.css';
import '../index.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const submitHandler = (values, { setSubmitting }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate('/');
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-red-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl text-red-100 font-bold mb-6 text-center">Sign In</h1>
        
        {error && <Message variant="danger">{error.message || 'Login failed'}</Message>}
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-white mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-red-300 text-white rounded hover:bg-black disabled:opacity-50 mb-4"
              >
                {loading ? <Loader small /> : 'Sign In'}
              </button>
              
              <div className="text-center">
                <p className="text-red-200">
                  New customer? <Link to="/register" className="text-white underline">Register here</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;