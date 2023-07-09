import React from "react";
import TourInitialDetails from "./TourInitialDetails";
import { useExpenseSplitContext } from "../context/Store";
import IndividualExpense from "./IndividualExpense";
import ExpenseDetailsList from "./common/ExpenseDetailsList";

const ExpenseSplitMain = () => {
  const { esStore } = useExpenseSplitContext();
  return (
    <div className="w-full flex flex-col items-center z-10 overflow-y-scroll">
      {!esStore.initialStage && <ExpenseDetailsList />}
      {esStore.initialStage ? <TourInitialDetails /> : <IndividualExpense />}
    </div>
  );
};

export default ExpenseSplitMain;
