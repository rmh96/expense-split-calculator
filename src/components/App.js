import React from "react";
import { ExpenseProvider } from "../context/Store";
import Header from "./common/Header";
import ExpenseSplitMain from "./ExpenseSplitMain";

const App = () => {
  return (
    <ExpenseProvider>
      <div className="w-full h-screen border p-3 flex flex-col items-center">
        <Header />
        <ExpenseSplitMain />
      </div>
    </ExpenseProvider>
  );
};

export default App;
