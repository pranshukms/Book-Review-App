import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, color = '#f8e825' }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-yellow-400">
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;