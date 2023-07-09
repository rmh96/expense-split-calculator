import React from "react";
import TourInitialDetails from "./TourInitialDetails";
import { useExpenseSplitContext } from "../context/Store";
import IndividualExpense from "./IndividualExpense";
import ExpenseDetailsList from "./common/ExpenseDetailsList";
import Header from "./common/Header";
import MainShareInfo from "./common/MainShareInfo";

const ExpenseSplitMain = () => {
  const { esStore, darkMode } = useExpenseSplitContext();
  return (
    <div
      className={`${
        darkMode ? "bg-darkMode text-white" : "bg-white"
      } w-full h-screen p-3 overflow-y-scroll mb-3`}
    >
      <Header />
      <div className="w-full flex flex-col items-center z-10 overflow-y-scroll">
        {!esStore.initialStage && <ExpenseDetailsList />}
        {esStore.initialStage ? <TourInitialDetails /> : <IndividualExpense />}
      </div>
      <MainShareInfo />
    </div>
  );
};

export default ExpenseSplitMain;
