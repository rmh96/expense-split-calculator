import React from "react";
import TourInitialDetails from "./TourInitialDetails";
import { useExpenseSplitContext } from "../context/Store";
import IndividualExpense from "./IndividualExpense";

const ExpenseSplitMain = () => {
  const { esStore } = useExpenseSplitContext();
  return esStore.initialStage ? <TourInitialDetails /> : <IndividualExpense />;
};

export default ExpenseSplitMain;
