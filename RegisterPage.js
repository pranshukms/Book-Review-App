import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../features/auth/authSlice.js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import '../style.css';
import '../index.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const submitHandler = (values, { setSubmitting }) => {
    const { confirmPassword, ...userData } = values;
    dispatch(register(userData))
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
        <h1 className="text-2xl text-white font-bold mb-6 text-center">Register</h1>
        
        {error && <Message variant="danger">{error.message || 'Registration failed'}</Message>}
        
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white mb-2">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-white mb-2">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-red-300 text-white rounded hover:bg-black disabled:opacity-50 mb-4"
              >
                {loading ? <Loader small /> : 'Register'}
              </button>
              
              <div className="text-center">
                <p className="text-red-200">
                  Already have an account? <Link to="/login" className="text-white underline">Login here</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;