import React, { useState } from "react";
import { useExpenseSplitContext } from "../../context/Store";

const ExpenseDetailsList = () => {
  const { esStore } = useExpenseSplitContext();
  const [detailsFlag, setFlag] = useState(false);
  return (
    <div className="w-full flex justify-end pt-2">
      <div
        className="cursor-pointer p-2 text-center border border-blue-300 rounded-xl shadow bg-blue-500 text-white transform transition-all duration-300 hover:scale-105 hover:bg-blue-600"
        onClick={() => setFlag(!detailsFlag)}
      >
        Expense Lists
        <span className="ml-2 border-white bg-white text-blue-500 p-1 rounded-2xl">
          {esStore.eachSpentExpenses.length}
        </span>
      </div>
      {detailsFlag ? (
        <div className="z-40 -mt-2 bg-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4 border border-blue-400 h-1/2 w-1/2 sm:w-[95.5%] sm:h-1/2 sm:top-3/5 md:w-[95.5%] md:h-1/2 md:top-3/5">
          <div
            id="expense-detail-list-container"
            className="h-full overflow-y-auto relative"
          >
            <div className="w-full h-12 border bg-blue-600 flex justify-between sticky top-0">
              <span className="text-white text-xl pl-2 flex justify-center items-center">
                Expense Details List:
              </span>
              <span
                className="cursor-pointer border-white bg-white text-blue-500 p-1 rounded-2xl mt-2 h-8 mr-4 px-2"
                onClick={() => setFlag(false)}
              >
                X
              </span>
            </div>
            {esStore.eachSpentExpenses.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-auto text-xl p-2 border-b-2"
                >
                  <div className="inline-block">{item.payer}</div>
                  <span> spent </span>
                  <div className="inline-block">{item.amountSpent}rs</div>
                  <span> for {item.description}</span>
                  <span>
                    {item.membersToShare.length === 1 &&
                    item.membersToShare[0] === item.payer
                      ? " for himself only"
                      : item.membersToShare.includes(item.payer)
                      ? ", which covered his own expenses along with "
                      : " on behalf of "}
                  </span>
                  <div className="inline-block">
                    {item.membersToShare.length > 1
                      ? item.membersToShare
                          .filter((name) => name !== item.payer)
                          .slice(0, -1)
                          .join(", ") +
                        ", and " +
                        item.membersToShare[item.membersToShare.length - 1]
                      : item.membersToShare[0] !== item.payer &&
                        item.membersToShare[0]}
                    .
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExpenseDetailsList;
