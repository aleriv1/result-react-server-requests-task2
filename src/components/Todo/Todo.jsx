import { useState } from "react";
import styles from "./Todo.module.scss";

export const Todo = ({
  todoLabel,
  id,
  editing,
  editTodo,
  deleteTodo,
  changeTodoLabel,
}) => {
  const [todoLabelInput, setTodoLabelInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    changeTodoLabel(id, todoLabelInput);
  };

  const onTodoLabelChange = (e) => {
    setTodoLabelInput(e.target.value);
  };

  return (
    <>
      <li className={`${styles.todoItem} ${editing ? styles.editing : ""}`}>
        <div className={styles.todoLabel}>
          {todoLabel}
          <button
            className={`${styles.icon} ${styles["icon-edit"]}`}
            onClick={() => editTodo(id, todoLabel)}
          >
            edit
          </button>
          <button className={`${styles.icon}`} onClick={() => deleteTodo(id)}>
            x
          </button>
        </div>
        <form className={styles.todoEdit} onSubmit={onSubmit}>
          <input
            type="text"
            value={todoLabelInput}
            onChange={onTodoLabelChange}
          />
        </form>
      </li>
    </>
  );
};
