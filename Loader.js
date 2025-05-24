import React from 'react';

const Loader = ({ small = false }) => {
  return (
    <div className={`flex justify-center items-center ${small ? 'py-2' : 'py-8'}`}>
      <div className={`${small ? 'w-6 h-6' : 'w-12 h-12'} border-4 border-red-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;