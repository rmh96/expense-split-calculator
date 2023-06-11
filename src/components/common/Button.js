import React from "react";

const Button = ({ value, id, handleSubmit }) => {
  return (
    <button
      type="button"
      id={id}
      className="border bg-blue-500 text-white w-24 p-1 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:bg-blue-600"
      onClick={handleSubmit}
    >
      {value}
    </button>
  );
};

export default Button;
