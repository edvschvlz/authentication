import React from "react";

import './Input.module.css'

const Input = ({ type, text, name, placeholder, refer }) => {
  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        ref={refer}
      />
    </>
  );
};

export default Input;
