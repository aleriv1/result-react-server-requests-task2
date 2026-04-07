// const todosMock = ["A", "l", "e", "n", "a"];

import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import styles from "./App.module.scss";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/todos")
      .then((rawResponse) => rawResponse.json())
      .then((response) => setTodos(response));
  }, []);

  return (
    <>
      <h1 className={styles.header}>todoS json-server</h1>
      <TodoList todos={todos} />
    </>
  );
}

export default App;
