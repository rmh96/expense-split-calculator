import React from "react";
import { useExpenseSplitContext } from "../../context/Store";
import { version } from "../../../package.json";

const Header = () => {
  const { resetApp, darkMode, updateDarkMode } = useExpenseSplitContext();
  console.log("dark-", darkMode);
  return (
    <div
      className={`flex flex-col items-center py-5 relative w-full flex justify-center text-2xl border border-blue-500`}
    >
      <h1 className="cursor-pointer" onClick={resetApp}>
        Expense Split Calculator
      </h1>
      <span style={{ fontSize: "13px" }}>
        v{version} still in development...
      </span>
      <div
        className={`${
          darkMode
            ? "bg-darkMode flex-row-reverse border border-lightMode"
            : "bg-lightMode"
        } w-24 h-11 sm:w-8 sm:h-8 sm:bottom-2 md:w-16 md:h-8 rounded-full cursor-pointer absolute right-2 flex items-center`}
        onClick={updateDarkMode}
      >
        <span
          className={`${
            darkMode ? "bg-moonBlue" : "bg-sunYellow"
          } m-1 h-10 w-10 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full`}
        ></span>
        <span
          className={`${
            darkMode ? "text-white border-white" : "text-black"
          } font-cursive text-sm sm:hidden md:text-xs`}
        >
          {darkMode ? "Moon" : "Sun"}
        </span>
      </div>
    </div>
  );
};

export default Header;
