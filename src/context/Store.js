import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ExpenseSplitInitialStates } from "./contanst";
//logger
import { useReducerWithLogger } from "./useReducerLogger";
//util method
import { calculateEachShare } from "./utils";

const ExpenseSplitContext = createContext({
  esStore: ExpenseSplitInitialStates,
  esDispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    //tourInitialSection
    case "location":
      return {
        ...state,
        tourDesc:
          action.payLoad.charAt(0).toUpperCase() + action.payLoad.slice(1),
      };
    case "addMember":
      return { ...state, tourMembers: [...state.tourMembers, action.payLoad] };
    case "removeMember":
      const removedList = state.tourMembers.filter((item) => {
        return item !== action.payLoad;
      });
      return { ...state, tourMembers: [...removedList] };
    //main logic Case
    case "shareAmountWith":
      return { ...state, amountOwnsToEachOthersList: action.payLoad };
    case "changeStage":
      return { ...state, initialStage: false };
    //Individual expepense section
    case "eachSpentExpenses":
      return {
        ...state,
        eachSpentExpenses: [...state.eachSpentExpenses, action.payLoad],
      };
    case "resetApp":
      return ExpenseSplitInitialStates;
    case "darkMode":
      return;
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [esStore, esDispatch] = useReducerWithLogger(
    reducer,
    ExpenseSplitInitialStates
  );
  const [darkMode, setDarkMode] = useState(false);

  const resetApp = () => {
    esDispatch({ type: "resetApp" });
  };
  const updateDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const members = esStore.tourMembers;
    const mainList = [];
    ``;
    for (let i = 0; i < members.length; i++) {
      const person = members[i];
      const sendAmountTo = [];
      for (let j = 0; j < members.length; j++) {
        if (i !== j) {
          sendAmountTo.push({ name: members[j], amountToShare: 0 });
        }
      }
      mainList.push({ name: person, shareAmountTo: sendAmountTo });
    }
    esDispatch({ type: "shareAmountWith", payLoad: mainList });
  }, [esStore.tourMembers]);

  useEffect(() => {
    /**
     * amountSpent: "6000"
       membersToShare: ['Harish', 'Shafee', 'Pooja', 'Udhaya', 'Thani']
       payer: "Harish"
     */
    const expenseDetail =
      esStore.eachSpentExpenses.length === 1
        ? esStore.eachSpentExpenses[0]
        : esStore.eachSpentExpenses[esStore.eachSpentExpenses.length - 1];

    const updateMainObj = calculateEachShare(
      expenseDetail,
      esStore.amountOwnsToEachOthersList
    );
    console.log("MainObj-", updateMainObj);
    esDispatch({ type: "shareAmountWith", payLoad: updateMainObj });
  }, [esStore.eachSpentExpenses]);

  return (
    <ExpenseSplitContext.Provider
      value={{ esStore, esDispatch, resetApp, darkMode, updateDarkMode }}
    >
      {children}
    </ExpenseSplitContext.Provider>
  );
};

export const useExpenseSplitContext = () =>
  React.useContext(ExpenseSplitContext);
