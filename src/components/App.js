import React from "react";
import { ExpenseProvider } from "../context/Store";
import Header from "./common/Header";
import ExpenseSplitMain from "./ExpenseSplitMain";
import MainShareInfo from "./common/MainShareInfo";

const App = () => {
  return (
    <ExpenseProvider>
      <div className="w-full h-screen p-3 overflow-y-scroll mb-3">
        <Header />
        <ExpenseSplitMain />
        <MainShareInfo />
      </div>
    </ExpenseProvider>
  );
};

export default App;
