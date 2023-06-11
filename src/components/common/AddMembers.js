import React, { useState } from "react";
import { useExpenseSplitContext } from "../../context/Store";

const AddMembers = ({ id, label }) => {
  const [name, setName] = useState("");
  const { esStore, esDispatch } = useExpenseSplitContext();
  return (
    <div className="w-full flex justify-between">
      <label className="inline-block" htmlFor="addMembers">
        {label}:
      </label>
      <div className="w-1/2">
        <input
          className="w-full border h-8 pl-1 rounded"
          placeholder="your crime partners"
          type="text"
          id="addMembers"
          autoComplete="off"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              esDispatch({
                type: "addMember",
                payLoad: name.charAt(0).toUpperCase() + name.slice(1),
              });
              setName("");
            }
          }}
        />
        {esStore.tourMembers.length > 0 && (
          <div className="w-full border mt-2 rounded h-auto overflow-auto">
            <ul className="flex space-x-1 flex-wrap p-1">
              {esStore.tourMembers.map((item, index) => {
                return (
                  <li className="border rounded inline-block p-1" key={index}>
                    <span className="mr-1">{item}</span>
                    <span
                      className="cursor-pointer bg-white border rounded-2xl"
                      onClick={(event) => {
                        esDispatch({ type: "removeMember", payLoad: item });
                      }}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMembers;
