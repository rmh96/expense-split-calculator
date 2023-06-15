import React, { useEffect, useReducer, useRef } from "react";

export const useReducerWithLogger = (reducer, initialState) => {
  const prevState = useRef(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Previous State", prevState.current);
    console.log("Next State", state);
    prevState.current = state;
  }, [state]);

  return [state, dispatch];
};
