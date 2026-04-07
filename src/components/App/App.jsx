// const todosMock = ["A", "l", "e", "n", "a"];

import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import styles from "./App.module.scss";
import { NewTodoForm } from "../NewTodoForm/NewTodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3002/todos")
      .then((response) => response.json())
      .then((responseTodo) => setTodos(responseTodo))
      .finally(() => setIsLoading(false));
  }, []);

  const addNewTodo = (todo) => {
    setIsLoading(true);
    fetch("http://localhost:3002/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: Date.now(),
        userId: 1,
        title: todo,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((responseTodo) => {
        setTodos((prevTodos) => [...prevTodos, responseTodo]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <h1 className={styles.header}>todoS json-server</h1>
      <NewTodoForm addNewTodo={addNewTodo} />
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <TodoList todos={todos} />
      )}
    </>
  );
}

export default App;
