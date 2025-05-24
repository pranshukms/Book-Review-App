import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../features/auth/authSlice.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../style.css';
import '../index.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      dispatch(getProfile());
    }
  }, [dispatch, userInfo]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const submitHandler = (values, { setSubmitting }) => {
    const { confirmPassword, ...profileData } = values;
    dispatch(updateProfile(profileData))
      .unwrap()
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-red-600 font-bold text-center mb-8">User Profile</h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message || 'Error loading profile'}</Message>
      ) : userInfo ? (
        <div className="max-w-md mx-auto bg-black p-6 rounded-lg shadow-md">
          <Formik
            initialValues={{
              username: userInfo.username || '',
              email: userInfo.email || '',
              password: '',
              confirmPassword: ''
            }}
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
                  <label htmlFor="password" className="block text-white mb-2">New Password ?</label>
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
                  className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <Message>Please login to view your profile</Message>
      )}
    </div>
  );
};

export default ProfilePage;