import React from "react";
import { ExpenseProvider } from "../context/Store";
import Header from "./common/Header";
import ExpenseSplitMain from "./ExpenseSplitMain";

const App = () => {
  return (
    <ExpenseProvider>
      <div className="w-full h-screen p-3">
        <Header />
        <ExpenseSplitMain />
      </div>
    </ExpenseProvider>
  );
};

export default App;
