import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Header from './components/header';
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AddBookPage from './pages/AddBookPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './style.css';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BookListPage />} />
                <Route path="/books/search/:keyword" element={<BookListPage />} />
                <Route path="/books/page/:pageNumber" element={<BookListPage />} />
                <Route path="/books/search/:keyword/page/:pageNumber" element={<BookListPage />} />
                <Route path="/books/:id" element={<BookPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/add-book" element={<AdminRoute><AddBookPage /></AdminRoute>} />
              </Routes>
            </main>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;