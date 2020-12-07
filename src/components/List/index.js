import React, { useContext, useMemo, useCallback, useRef } from "react";
import { TaskListContext } from "context/taskList.context";
import Task from "components/Task";
import { useResizeHeight } from "../../hooks/useResizeHeight";

import { StyledHeight, StyledList } from "./styles";

const List = () => {
  const { taskList = [], dispatch } = useContext(TaskListContext);

  const listRef = useRef(null);
  const currentHeight = useResizeHeight(listRef);

  const onDelete = useCallback(
    (id) => {
      dispatch({ type: "REMOVE_TASK", id });
    },
    [dispatch]
  );
  const onSave = useCallback(
    (task, id) => {
      dispatch({ type: "UPDATE_TASK", payload: { task, id } });
    },
    [dispatch]
  );
  const onCompleted = useCallback(
    (id) => {
      dispatch({ type: "TASK_COMPLETED", id });
    },
    [dispatch]
  );

  const isTaskExists = useCallback(
    (inputValue) => taskList.some(({ task }) => inputValue === task),
    [taskList]
  );

  const taskRenderer = useMemo(
    () => ({ task, id, isCompleted }) => (
      <Task
        key={id}
        id={id}
        isCompleted={isCompleted}
        onDelete={onDelete}
        onSave={onSave}
        onCompleted={onCompleted}
        isTaskExists={isTaskExists}
      >
        {task}
      </Task>
    ),
    [onDelete, onSave, onCompleted, isTaskExists]
  );

  const completedTasks = useMemo(
    () => taskList.filter(({ isCompleted }) => !isCompleted),
    [taskList]
  );
  const uncompletedTasks = useMemo(
    () => taskList.filter(({ isCompleted }) => isCompleted),
    [taskList]
  );

  return (
    <StyledList ref={listRef}>
      <h3>New Tasks</h3>
      {completedTasks.map(taskRenderer)}
      <h3>Completed Tasks</h3>
      {uncompletedTasks.map(taskRenderer)}

      <StyledHeight>List height: {currentHeight} px</StyledHeight>
    </StyledList>
  );
};

export default List;
