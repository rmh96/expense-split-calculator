import React, { useState } from "react";
import { useExpenseSplitContext } from "../../context/Store";

const DropDown = ({ label, id, updateNameInParent }) => {
  const { esStore } = useExpenseSplitContext();
  const [dropDownFlag, setDropDownFlag] = useState(false);
  const [name, setName] = useState("");

  const handleDropDownChange = () => {
    setDropDownFlag(!dropDownFlag);
  };

  return (
    <div className="w-full flex justify-between">
      <label className="inline-block" htmlFor="tour-desc">
        {label}
      </label>
      <div className="w-1/2">
        <div
          className={`w-full flex justify-between items-center border h-7 pl-1 rounded ${
            dropDownFlag ? "border-blue-600" : ""
          }`}
          onClick={handleDropDownChange}
        >
          <input
            className="outline-0 h-6 "
            placeholder="Select a person"
            value={name}
            readOnly
          />
          <span
            className={`pr-3 pt-1 transform transition duration-300 linear ${
              dropDownFlag ? "rotate-180 transform-origin-center" : ""
            }`}
          >
            ^
          </span>
        </div>

        {dropDownFlag && esStore.tourMembers.length > 0 ? (
          <div className="w-full border h-28 rounded overflow-scroll">
            {esStore.tourMembers.map((item, index) => (
              <div
                className="w-full h-7 flex items-center border pl-1 hover:bg-blue-200 text-sm"
                key={index}
                onClick={() => {
                  setDropDownFlag(false);
                  setName(item);
                  updateNameInParent(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DropDown;
