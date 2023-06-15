import React from "react";
import TourInitialDetails from "./TourInitialDetails";
import { useExpenseSplitContext } from "../context/Store";
import IndividualExpense from "./IndividualExpense";

const ExpenseSplitMain = () => {
  const { esStore } = useExpenseSplitContext();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-end pt-2">
        <div className="cursor-pointer p-2 text-center border border-blue-300 rounded-xl shadow bg-blue-500 text-white transform transition-all duration-300 hover:scale-105 hover:bg-blue-600">
          Expense Lists
          <span className="ml-2 border-white bg-white text-blue-500 p-1 rounded-2xl">
            {esStore.eachSpentExpenses.length}
          </span>
        </div>
      </div>
      {esStore.initialStage ? <TourInitialDetails /> : <IndividualExpense />}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-blue-400 h-1/2 w-1/3"></div>
    </div>
  );
};

export default ExpenseSplitMain;
