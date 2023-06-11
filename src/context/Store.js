import React, { createContext, useContext, useReducer } from "react";
import { ExpenseSplitInitialStates } from "./contanst";

const ExpenseSplitContext = createContext({
  esStore: ExpenseSplitInitialStates,
  esDispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    //tourInitialSection
    case "location":
      return { ...state, tourDesc: action.payLoad };
    case "addMember":
      return { ...state, tourMembers: [...state.tourMembers, action.payLoad] };
    case "removeMember":
      const removedList = state.tourMembers.filter((item) => {
        return item !== action.payLoad;
      });
      return { ...state, tourMembers: [...removedList] };
    case "changeStage":
      return { ...state, initialStage: false };
    //Individual expepense section
    case "resetApp":
      return ExpenseSplitInitialStates;
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [esStore, esDispatch] = useReducer(reducer, ExpenseSplitInitialStates);
  const resetApp = () => {
    esDispatch({ type: "resetApp" });
  };
  return (
    <ExpenseSplitContext.Provider value={{ esStore, esDispatch, resetApp }}>
      {children}
    </ExpenseSplitContext.Provider>
  );
};

export const useExpenseSplitContext = () =>
  React.useContext(ExpenseSplitContext);
