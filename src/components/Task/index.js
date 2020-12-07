import React, { useState, Fragment, useCallback } from "react";
import Input from "components/Input";

import {
  StyledEdit,
  StyledTask,
  StyledDelete,
  StyledDone,
  StyledText,
  StyledButton,
  StyledEditForm,
  StyledButtonsWrapper,
} from "./styles";

const Task = ({
  onDelete,
  onCompleted,
  onSave,
  children,
  id,
  isCompleted,
  isTaskExists,
}) => {
  const [editValue, setEditValue] = useState("");
  const [isEdit, setEdit] = useState(false);

  const onEditChange = useCallback((value) => setEditValue(value), [
    setEditValue,
  ]);

  const onEditPress = useCallback(() => {
    setEditValue(children);
    setEdit(true);
  }, [setEditValue, setEdit, children]);

  const onSaveEdit = useCallback(
    (e) => {
      e.preventDefault();

      if (editValue && !isTaskExists(editValue)) {
        onSave(editValue, id);
        setEditValue("");
        setEdit(false);
      }
    },
    [onSave, setEditValue, setEdit, isTaskExists, id, editValue]
  );

  return (
    <StyledTask>
      {isEdit ? (
        <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit}>
          <Input
            onChange={onEditChange}
            value={editValue}
            placeholder="Task must contain title"
          />
        </StyledEditForm>
      ) : (
        <Fragment>
          <StyledText isCompleted={isCompleted}>{children}</StyledText>

          <StyledButtonsWrapper>
            <StyledButton onClick={() => onCompleted(id)}>
              <StyledDone />
            </StyledButton>
            <StyledButton onClick={onEditPress}>
              <StyledEdit />
            </StyledButton>
            <StyledButton onClick={() => onDelete(id)}>
              <StyledDelete />
            </StyledButton>
          </StyledButtonsWrapper>
        </Fragment>
      )}
    </StyledTask>
  );
};

export default Task;
