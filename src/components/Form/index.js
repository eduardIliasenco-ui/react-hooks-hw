import React, { useContext, useState, useMemo, useCallback } from "react";
import Input from "components/Input";
import { TaskListContext } from "context/taskList.context";

import { StyledForm, StyledAddButton } from "./styles";

const Form = () => {
  const { taskList, dispatch } = useContext(TaskListContext);
  const [inputValue, setInputValue] = useState("");

  const onChange = useCallback(
    (value) => {
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleAddTask = useCallback(
    (e) => {
      e.preventDefault();
      if (inputValue) {
        dispatch({ type: "ADD_TASK", payload: { task: inputValue } });
        setInputValue("");
      }
    },
    [inputValue]
  );

  const isTaskExists = useMemo(
    () => taskList.some(({ task }) => inputValue === task),
    [taskList, inputValue]
  );

  return (
    <StyledForm onSubmit={handleAddTask}>
      <Input value={inputValue} onChange={onChange} />

      <StyledAddButton disabled={isTaskExists || !inputValue}>
        ADD TASK
      </StyledAddButton>
    </StyledForm>
  );
};

export default Form;
