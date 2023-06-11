import React from "react";

const App = () => {
  return (
    <div className="w-full h-screen border p-3 flex flex-col items-center">
      <h1 className="py-5 w-full flex justify-center text-2xl border">
        Expense Split Calculator
      </h1>
      <div id="tour-details" className="w-1/3 mt-10 flex flex-col items-center">
        <h2 className="text-lg">Tour Details</h2>
        <form
          id="members-form"
          className="w-full border rounded-2xl shadow-2xl p-5 flex flex-col items-center space-y-4 text-sm"
        >
          <div className="w-full flex justify-between items-center">
            <label className="inline-block" htmlFor="tour-desc">
              Tour Description:
            </label>
            <input className="w-1/2 border h-8" type="text" id="tour-desc" />
          </div>
          <div className="w-full flex justify-between">
            <label className="inline-block" htmlFor="add-members">
              Add Members:
            </label>
            <div className="w-1/2">
              <input
                className="w-full border h-8"
                type="text"
                id="add-members"
              />
              <div className="w-full border h-16 mt-2"></div>
            </div>
          </div>
          <button className="border w-24 p-1 rounded-2xl">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
