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
    membersToShare: [],
  });

  const handleCheckBoxChange = (options) => {
    setSpentDetails({
      ...spentDetails,
      membersToShare: [...options],
    });
  };

  const handleFormSubmit = () => {
    console.log(spentDetails);
  };

  return (
    <div
      id="individual-expense"
      className="sm:w-full md:w-5/6 w-1/3 mt-10 flex flex-col items-center"
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
          updateNameInParent={(name) => {
            setSpentDetails({
              ...spentDetails,
              payer: name,
            });
          }}
        />
        <div className="w-full flex justify-between items-center">
          <label className="inline-block" htmlFor="amount-spent">
            Amount Spent:
          </label>
          <input
            className="w-1/2 border h-8 pl-1 rounded"
            placeholder="where you went?"
            type="number"
            id="amount-spent"
            value={spentDetails.amountSpent}
            autoComplete="off"
            onChange={(event) =>
              setSpentDetails({
                ...spentDetails,
                amountSpent: event.target.value,
              })
            }
          />
        </div>
        <CheckBoxList
          label={"Share with:"}
          updateListInParent={handleCheckBoxChange}
        />
        <Button value={"Submit"} handleSubmit={handleFormSubmit} />
      </form>
    </div>
  );
};

export default IndividualExpense;
