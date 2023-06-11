import React from "react";
import { useExpenseSplitContext } from "../../context/Store";

const Header = () => {
  const { resetApp } = useExpenseSplitContext();
  return (
    <h1
      className="cursor-pointer py-5 w-full flex justify-center text-2xl border border-blue-500"
      onClick={resetApp}
    >
      Expense Split Calculator
    </h1>
  );
};

export default Header;
