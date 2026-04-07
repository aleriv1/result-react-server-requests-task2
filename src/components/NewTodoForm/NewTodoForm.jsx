import { useState } from "react";

export const NewTodoForm = ({ addNewTodo }) => {
  const [todoLabel, setTodoLabel] = useState("");

  const onNewTodoLableChange = (e) => {
    setTodoLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addNewTodo(todoLabel);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={todoLabel} onChange={onNewTodoLableChange} />
      </form>
    </>
  );
};
