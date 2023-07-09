import React from "react";
import { useExpenseSplitContext } from "../../context/Store";

const MainShareInfo = () => {
  const { esStore } = useExpenseSplitContext();
  return (
    !esStore.initialStage && (
      <div className="w-full h-1/3 mt-10 flex flex-col ">
        <div className="w-full flex justify-center text-xl">{`${esStore.tourDesc}'s - Details Expense Share Report`}</div>
        <div className="h-full flex flex-wrap justify-evenly">
          {esStore.amountOwnsToEachOthersList.length > 0 &&
            esStore.amountOwnsToEachOthersList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-64 w-1/4 sm:w-full md:w-1/3 mx-2 mb-2 border border-blue-500 flex overflow-y-scroll"
                >
                  <div className="h-full w-1/3 flex items-center justify-center">
                    {item.name}
                  </div>
                  <div className="h-full w-1/3 flex flex-col space-y-3 justify-between">
                    {item.shareAmountTo.map((amountEntry, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full h-10 bg-blue-500 text-white flex justify-start pl-3 p-1 items-center"
                          style={{
                            clipPath:
                              "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
                          }}
                        >
                          {Math.round(amountEntry.amountToShare)}
                        </div>
                      );
                    })}
                  </div>
                  <div className="h-full w-1/3 flex flex-col justify-between space-y-3">
                    {item.shareAmountTo.map((nameEntry, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full h-10 flex justify-start pl-3 p-1 items-center justify-center"
                        >
                          {nameEntry.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default MainShareInfo;
