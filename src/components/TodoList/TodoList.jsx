import { Todo } from "../Todo/Todo";
import styles from "./TodoList.module.scss";

export const TodoList = ({ todos, editTodo, deleteTodo, changeTodoLabel }) => {
  return todos.length ? (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          changeTodoLabel={changeTodoLabel}
        />
      ))}
    </ul>
  ) : (
    <p className={styles.empty}>Список пуст. Добавьте задачу.</p>
  );
};
