import React, { useState } from "react";
import { useExpenseSplitContext } from "../context/Store";
import Button from "./common/Button";
import AddMembers from "./common/AddMembers";

const TourInitialDetails = () => {
  const { esStore, esDispatch, darkMode } = useExpenseSplitContext();
  const [error, setError] = useState({ "tour-desc": false, addMembers: false });
  const handleNextClick = () => {
    console.log();
    if (esStore.tourDesc === "" || !esStore.tourMembers.length) {
      esStore.tourDesc == "" && !esStore.tourMembers.length
        ? setError({ "tour-desc": true, addMembers: true })
        : esStore.tourDesc === "" && esStore.tourMembers.length > 0
        ? setError({ "tour-desc": true, addMembers: false })
        : esStore.tourDesc !== "" &&
          !esStore.tourMembers.length &&
          setError({ "tour-desc": false, addMembers: true });
      setTimeout(() => {
        setError({ "tour-desc": false, addMembers: false });
      }, 1000);
    } else {
      esDispatch({ type: "changeStage" });
    }
  };

  return (
    <div
      id="tour-details"
      className="sm:w-full md:w-5/6 w-1/3 mt-10 flex flex-col items-center"
    >
      <h2 className="text-lg">Tour Details</h2>
      <form
        id="tour-details-form"
        className="w-full border rounded-2xl shadow-2xl border-blue-500 p-5 flex flex-col items-center space-y-4 text-sm"
        onSubmit={(event) => {
          event.defaultPrevented();
        }}
      >
        <div className={`w-full flex justify-between items-center `}>
          <label className="inline-block" htmlFor="tour-desc">
            Description:
          </label>
          <input
            className={`w-1/2 border h-8 pl-1 rounded ${
              error["tour-desc"] ? "shake-box" : ""
            } ${darkMode && "bg-darkMode"}`}
            placeholder="where you went?"
            type="text"
            id="tour-desc"
            value={esStore.tourDesc}
            autoComplete="off"
            onChange={(event) => {
              esDispatch({ type: "location", payLoad: event.target.value });
            }}
          />
        </div>
        <AddMembers
          id={"addMembers"}
          label="Add Members"
          isEmptyCheck={error.addMembers}
        />
        <Button value={"Next"} handleSubmit={handleNextClick} id={"next"} />
      </form>
    </div>
  );
};

export default TourInitialDetails;
