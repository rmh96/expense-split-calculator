import React from "react";
import { ExpenseProvider } from "../context/Store";
import Header from "./common/Header";
import ExpenseSplitMain from "./ExpenseSplitMain";
import MainShareInfo from "./common/MainShareInfo";

const App = () => {
  return (
    <ExpenseProvider>
      <ExpenseSplitMain />
    </ExpenseProvider>
  );
};

export default App;
