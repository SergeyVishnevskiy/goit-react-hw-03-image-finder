import React from "react";
import "./Button.css";

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="Button">
      Load More
    </button>
  );
};

export default Button;
