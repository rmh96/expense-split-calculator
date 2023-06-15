import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ExpenseSplitInitialStates } from "./contanst";
//logger
import { useReducerWithLogger } from "./useReducerLogger";

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
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [esStore, esDispatch] = useReducerWithLogger(
    reducer,
    ExpenseSplitInitialStates
  );
  const resetApp = () => {
    esDispatch({ type: "resetApp" });
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
    // esStore.eachSpentExpenses.forEach((expense) => {
    //   const { payer, amountSpent, membersToShare } = expense;
    //   let updateShareAmountWith = esStore.amountOwnsToEachOthersList;
    //   const payerObj = updateShareAmountWith.find((obj) => obj.name === payer);
    //   if (payerObj) {
    //     const totalMembers = membersToShare.length;
    //     const shareAmountPerMember = amountSpent / totalMembers;

    //     membersToShare.forEach((member) => {
    //       const shareEntry = payerObj.shareAmountTo.find(
    //         (entry) => entry.name === member
    //       );

    //       if (shareEntry) {
    //         shareEntry.amountToShare += shareAmountPerMember;
    //       }
    //     });
    //   }
    //   esDispatch({ type: "shareAmountWith", payLoad: updateShareAmountWith });
    // });

    const listOfExpenses = esStore.eachSpentExpenses;
    for (let i = 0; i < listOfExpenses.length; i++) {
      const item = listOfExpenses[i];
      if (item.membersToShare.length === esStore.tourMembers.length) {
        //if user selects All
        const equalAmt = item.amountSpent / item.membersToShare.length;
        let updateShareAmountWith = esStore.amountOwnsToEachOthersList;
        updateShareAmountWith.map((entry) => {
          if (entry.name !== item.payer) {
            for (let i = 0; i < entry.shareAmountTo.length; i++) {
              if (item.payer === entry.shareAmountTo[i].name) {
                entry.shareAmountTo[i].amountToShare += equalAmt;
              }
            }
          }
        });
        esDispatch({ type: "shareAmountWith", payLoad: updateShareAmountWith });
      } else if (item.membersToShare.includes(item.payer)) {
        //if user selects few including the person paid
        const equalAmt = item.amountSpent / item.membersToShare.length;
        let updateShareAmountWith = esStore.amountOwnsToEachOthersList;
        updateShareAmountWith.map((entry) => {
          if (item.membersToShare.includes(entry.name)) {
            //const balanceAmt = entry[item.payer]
            for (let i = 0; i < entry.shareAmountTo.length; i++) {
              if (item.payer === entry.shareAmountTo[i].name) {
                entry.shareAmountTo[i].amountToShare += equalAmt;
              }
            }
          }
        });
      } else if (!item.membersToShare.includes(item.payer)) {
        //if user selects few not including the person paid
        const equalAmt = item.amountSpent / item.membersToShare.length;
        let updateShareAmountWith = esStore.amountOwnsToEachOthersList;
        updateShareAmountWith.map((entry) => {
          if (item.membersToShare.includes(entry.name)) {
            //const balanceAmt = entry[item.payer]
            for (let i = 0; i < entry.shareAmountTo.length; i++) {
              if (item.payer === entry.shareAmountTo[i].name) {
                entry.shareAmountTo[i].amountToShare += equalAmt;
              }
            }
          }
        });
      }
    }
  }, [esStore.eachSpentExpenses]);

  return (
    <ExpenseSplitContext.Provider value={{ esStore, esDispatch, resetApp }}>
      {children}
    </ExpenseSplitContext.Provider>
  );
};

export const useExpenseSplitContext = () =>
  React.useContext(ExpenseSplitContext);
