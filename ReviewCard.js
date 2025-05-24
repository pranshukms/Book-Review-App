import React from 'react';
import Rating from './Rating';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

const ReviewCard = ({ review, onDelete }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{review.user.username}</h4>
          <Rating value={review.rating} />
        </div>
        <span className="text-gray-500 text-sm">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <p className="text-gray-700 mt-2">{review.text}</p>
      
      {userInfo && userInfo._id === review.user._id && (
        <button 
          onClick={() => onDelete(review._id)}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default ReviewCard;