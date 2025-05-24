import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import bookReducer from './features/books/bookSlice';
import reviewReducer from './features/reviews/reviewSlice';
import authReducer from './features/auth/authSlice.js';

const rootReducer = combineReducers({
  books: bookReducer,
  reviews: reviewReducer,
  auth: authReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export const persistor = persistStore(store);