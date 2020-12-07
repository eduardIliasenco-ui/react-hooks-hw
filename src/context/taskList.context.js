import React, { createContext, useEffect, useReducer } from "react";
import { taskReducer } from "../reducers/taskReducer";

export const TaskListContext = createContext({});
const { Provider } = TaskListContext;

const TaskListProvider = ({ defaultState, children }) => {
  const [list, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    if (Array.isArray(defaultState))
      dispatch({ type: "GET_STORAGE", payload: defaultState });
  }, [defaultState, dispatch]);

  return (
    <Provider
      value={{
        taskList: list,
        dispatch,
      }}
    >
      {children}
    </Provider>
  );
};

export default TaskListProvider;
