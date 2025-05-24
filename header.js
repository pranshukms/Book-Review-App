import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FaBook, FaSignInAlt, FaSignOutAlt, FaUser, FaPlus } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, userToken, isAdmin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-red-950 flex justify-between text-white p-4 w-[100vw] h-[25vh]">
      <div className="container mx-auto flex justify-around items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-bold">Book Reviews Platform - By Pranshu Sharma </h1>
        </Link>
        
        <nav>
          <ul className="block md:flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-red-200 p-6">Home</Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-red-200 pr-3">Books</Link>
            </li>
            
            {userToken ? (
              <>
                {isAdmin && (
                  <li>
                    <Link to="/add-book" className="flex items-center hover:text-red-200 pr-2">
                      <FaPlus className="mr-1" />AddBook
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/profile" className="flex items-center hover:text-red-200">
                    <FaUser className="mr-1" /> Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center hover:text-red-200"
                  >Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="flex items-center hover:text-red-200">Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;