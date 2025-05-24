import React from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Message = ({ variant = 'info', children }) => {
  const variants = {
    info: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <FaInfoCircle className="text-red-500" />
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <FaCheckCircle className="text-green-500" />
    },
    danger: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <FaExclamationCircle className="text-red-500" />
    }
  };

  const { bg, text, icon } = variants[variant] || variants.info;

  return (
    <div className={`${bg} ${text} p-4 rounded-lg mb-4 flex items-start`}>
      <span className="mr-2 mt-1">{icon}</span>
      <div>{children}</div>
    </div>
  );
};

export default Message;