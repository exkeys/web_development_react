import { Children, createContext, useReducer, useState } from "react";
import Reducer from "../reducer/Reducer";

const INITIAL_STATE = {isLogin: false,  message: ''}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({Children}) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return(
    <Context.Provider value = {{
      state,
      dispatch,
    }}>
      {children}
    </Context.Provider>
  );
}

export default Context;



