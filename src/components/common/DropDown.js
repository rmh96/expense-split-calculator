import React, { useState, useEffect } from "react";
import { useExpenseSplitContext } from "../../context/Store";

const DropDown = ({
  label,
  id,
  updateNameInParent,
  isEmptyCheck,
  parentValue,
}) => {
  const { esStore, darkMode } = useExpenseSplitContext();
  const [options, setOptions] = useState(esStore.tourMembers);
  const [dropDownFlag, setDropDownFlag] = useState(false);
  const [name, setName] = useState(parentValue);
  const [filterValue, setFilterValue] = useState("");

  const handleDropDownChange = () => {
    setDropDownFlag(!dropDownFlag);
  };

  useEffect(() => {
    setName(parentValue);
  }, [parentValue]);

  useEffect(() => {
    setOptions(
      filterValue !== ""
        ? options.filter((option) =>
            option.toLowerCase().includes(filterValue.toLowerCase())
          )
        : esStore.tourMembers
    );
  }, [filterValue]);

  return (
    <div className="w-full flex justify-between">
      <label className="inline-block" htmlFor="tour-desc">
        {label}
      </label>
      <div className="w-1/2 flex flex-col items-center">
        <div
          className={`w-full flex justify-between items-center border h-7 pl-1 rounded ${
            dropDownFlag ? "border-blue-600" : ""
          } ${isEmptyCheck ? "shake-box" : ""}`}
          onClick={handleDropDownChange}
        >
          <input
            className={`outline-0 h-6 ${darkMode && "bg-darkMode"}`}
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
          <div className="w-full border h-28 overflow-scroll relative">
            <input
              className={`sticky top-0 p-2 w-full h-6 outline-none border-b-2 ${
                darkMode && "bg-darkMode"
              }`}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
              placeholder="search"
            />
            {options.map((item, index) => (
              <div
                className="w-full h-7 flex items-center border-b-2 pl-1 hover:bg-blue-500 text-sm"
                key={index}
                onClick={() => {
                  setDropDownFlag(false);
                  setFilterValue("");
                  if (name === item) {
                    setName("");
                    updateNameInParent("");
                  } else {
                    setName(item);
                    updateNameInParent(item);
                  }
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
