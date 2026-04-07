// const todosMock = ["A", "l", "e", "n", "a"];

import { useEffect, useState } from "react";
import { TodoList } from "../TodoList/TodoList";
import styles from "./App.module.scss";
import { NewTodoForm } from "../NewTodoForm/NewTodoForm";
import { TodoSearch } from "../TodoSearch/TodoSearch";
import { TodoSortToggle } from "../TodoSortToggle/TodoSortToggle";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3002/todos")
      .then((response) => response.json())
      .then((responseTodo) => setTodos(responseTodo))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery.toLowerCase());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const addNewTodo = (todo) => {
    setIsLoading(true);
    fetch("http://localhost:3002/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: Date.now(),
        todoLabel: todo,
        editing: false,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((responseTodo) => {
        setTodos((prevTodos) => [...prevTodos, responseTodo]);
      })
      .finally(() => setIsLoading(false));
  };

  const editTodo = (id, editingState) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        editing: editingState,
      }),
    })
      .then((response) => response.json())
      .then((responseTodo) =>
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            return todo.id === responseTodo.id
              ? { ...todo, editing: responseTodo.editing }
              : todo;
          });
        }),
      );
  };

  const changeTodoLabel = (id, todoLabelInput) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        todoLabel: todoLabelInput,
        editing: false,
      }),
    })
      .then((resp) => resp.json())
      .then((respTodo) => {
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            return todo.id === respTodo.id
              ? {
                  ...todo,
                  todoLabel: respTodo.todoLabel,
                  editing: respTodo.editing,
                }
              : todo;
          });
        });
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prevTodos) => {
          return prevTodos.filter((todo) => {
            return todo.id !== id;
          });
        });
      });
  };

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <h1 className={styles.header}>todoS json-server</h1>
        <NewTodoForm addNewTodo={addNewTodo} />
        {isLoading ? (
          <div
            className={styles.loader}
            aria-label="Загрузка"
            role="status"
          ></div>
        ) : (
          <>
            <TodoList
              todos={todos}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              changeTodoLabel={changeTodoLabel}
              searchQuery={debouncedQuery}
              isSortEnabled={isSortEnabled}
            />
            <div className={styles.controlsRow}>
              <TodoSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <TodoSortToggle
                isSortEnabled={isSortEnabled}
                onToggle={() => setIsSortEnabled((prev) => !prev)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
