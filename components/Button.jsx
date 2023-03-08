import React from "react";

function Button({ children, className, variant, handleClick, type }) {
  return (
    <button
      onClick={handleClick}
      type={type || "button"}
      className={`
      button ${
        variant === "outlined" ? "button__outlined" : "button__contained"
      } ${className} 
      `}
    >
      {children}
    </button>
  );
}

export default Button;
