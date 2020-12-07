import { saveState } from "../utils/localStorage";
import { v4 } from "uuid";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "GET_STORAGE": {
      return action.payload;
    }
    case "ADD_TASK": {
      let newState = [
        ...state,
        { task: action.payload.task, id: v4(), isCompleted: false },
      ];
      saveState(newState);
      return newState;
    }
    case "UPDATE_TASK": {
      let newState = state.map((taskItem) =>
        taskItem.id == action.payload.id
          ? {
              ...taskItem,
              task: action.payload.task,
              isCompleted: false,
            }
          : taskItem
      );
      saveState(newState);
      return newState;
    }
    case "REMOVE_TASK": {
      let newState = [...state.filter(({ id }) => id !== action.id)];
      saveState(newState);
      return newState;
    }
    case "TASK_COMPLETED": {
      let newState = state.map((taskItem) =>
        taskItem.id == action.id
          ? { ...taskItem, isCompleted: !taskItem.isCompleted }
          : taskItem
      );
      saveState(newState);
      return newState;
    }
    default:
      return state;
  }
};
