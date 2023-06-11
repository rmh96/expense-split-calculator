import React, { useState } from "react";
import { useExpenseSplitContext } from "../../context/Store";

const CheckBoxList = ({ label, updateListInParent }) => {
  const { esStore } = useExpenseSplitContext();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectedOptions = (option) => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions.includes(option)) {
      newSelectedOptions.splice(newSelectedOptions.indexOf(option), 1);
    } else {
      newSelectedOptions.push(option);
    }
    setSelectedOptions(newSelectedOptions);
    updateListInParent(newSelectedOptions);
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === esStore.tourMembers.length) {
      setSelectedOptions([]);
      updateListInParent([]);
    } else {
      setSelectedOptions(esStore.tourMembers);
      updateListInParent(esStore.tourMembers);
    }
  };

  return (
    <div className="w-full flex justify-between">
      <label className="inline-block" htmlFor="tour-desc">
        {label}
      </label>
      <div className="w-1/2 border h-28 flex flex-wrap overflow-y-auto">
        <div className="w-1/2 flex items-center p-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={"All"}
              checked={selectedOptions.length === esStore.tourMembers.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            All
          </label>
        </div>
        {esStore.tourMembers.length > 0 &&
          esStore.tourMembers.map((item, index) => {
            return (
              <div className="w-1/2 flex items-center p-2" key={index}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={selectedOptions.includes(item)}
                    onChange={() => handleSelectedOptions(item)}
                    className="mr-2"
                  />
                  {item}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CheckBoxList;
