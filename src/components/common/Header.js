import React from "react";
import { useExpenseSplitContext } from "../../context/Store";

const Header = () => {
  const { resetApp } = useExpenseSplitContext();
  return (
    <div className="flex flex-col items-center cursor-pointer py-5 w-full flex justify-center text-2xl border border-blue-500">
      <h1 onClick={resetApp}>Expense Split Calculator</h1>
      <span style={{ fontSize: "13px" }}>@Still in development...</span>
    </div>
  );
};

export default Header;
