import React, { useState } from "react";
import DropDown from "./common/DropDown";
import CheckBoxList from "./common/CheckBoxList";
import Button from "./common/Button";
import { useExpenseSplitContext } from "../context/Store";

const IndividualExpense = () => {
  const { esStore, esDispatch } = useExpenseSplitContext();
  const [spentDetails, setSpentDetails] = useState({
    payer: "",
    amountSpent: 0,
    description: "",
    membersToShare: [],
  });
  const [error, setError] = useState(false);

  const handleCheckBoxChange = (options) => {
    setSpentDetails({
      ...spentDetails,
      membersToShare: [...options],
    });
  };

  const handleFormSubmit = () => {
    if (spentDetails.payer === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    } else {
      esDispatch({ type: "eachSpentExpenses", payLoad: spentDetails });
      setSpentDetails({
        payer: "",
        amountSpent: 0,
        description: "",
        membersToShare: [],
      });
    }
  };

  return (
    <div
      id="individual-expense"
      className="sm:w-full md:w-5/6 w-1/3 mt-6 flex flex-col items-center transition duration-300 ease-linear"
    >
      <h2 className="text-lg">{esStore.tourDesc} - Individual Expense</h2>
      <form
        id="indivial-expense-form"
        className="w-full border rounded-2xl shadow-2xl border-blue-500 p-5 flex flex-col items-center space-y-4 text-sm"
        onSubmit={(event) => {
          event.defaultPrevented();
        }}
      >
        <DropDown
          label="Who opened the wallet?"
          id="payer"
          parentValue={spentDetails.payer}
          updateNameInParent={(name) => {
            setSpentDetails({
              ...spentDetails,
              payer: name,
            });
          }}
          isEmptyCheck={error}
        />
        <div className="w-full flex justify-between items-center">
          <label className="inline-block" htmlFor="amount-spent">
            Amount Spent:
          </label>
          <input
            className="w-1/2 border h-8 pl-1 rounded"
            placeholder={
              spentDetails.amountSpent === 0 ? "how much amount spent?" : ""
            }
            type="number"
            id="amount-spent"
            value={
              spentDetails.amountSpent === 0 ? "" : spentDetails.amountSpent
            }
            onKeyDown={(e) => {
              if (e.key === "-" || e.keyCode === 45) {
                e.preventDefault();
              }
            }}
            autoComplete="off"
            onChange={(event) =>
              setSpentDetails({
                ...spentDetails,
                amountSpent: event.target.value,
              })
            }
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <label className="inline-block" htmlFor="description">
            Description:
          </label>
          <input
            className="w-1/2 border h-8 pl-1 rounded"
            placeholder={
              spentDetails.description === "" ? "where you spent?" : ""
            }
            type="text"
            id="description"
            value={
              spentDetails.description === "" ? "" : spentDetails.description
            }
            autoComplete="off"
            onChange={(event) =>
              setSpentDetails({
                ...spentDetails,
                description: event.target.value,
              })
            }
          />
        </div>
        <CheckBoxList
          label={"Share with:"}
          parentValue={spentDetails.membersToShare}
          updateListInParent={handleCheckBoxChange}
        />
        <Button value={"Submit"} handleSubmit={handleFormSubmit} />
      </form>
    </div>
  );
};

export default IndividualExpense;
