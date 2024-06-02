import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className=' bg-transparent border-borderColor rounded-2xl border-2'
      style={{
        padding: '10px',
        margin: '10px 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomInput;
