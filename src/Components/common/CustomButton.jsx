import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ type, onClick, children }) => {
  return (
    <div className='flex items-center  justify-center '>
    <button
      type={type}
      onClick={onClick}
      className=' bg-[#1a1a1b] font-Roboto rounded-3xl text-center text-textColor font-bold text-3xl  p-2 px-8'
    >
      {children}
    </button>
    </div>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  onClick: () => {},
};

export default CustomButton;
