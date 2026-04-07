// const todosMock = ["A", "l", "e", "n", "a"];

import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("https://localhost:3002/todos")
      .then((rawResponse) => rawResponse.json())
      .then((response) => setTodos(response));
  }, []);

  return (
    <>
      <h1>todoS json-server</h1>
      <TodoList todos={todos} />
    </>
  );
}

export default App;
