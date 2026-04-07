import { Todo } from "../Todo/Todo";

export const TodoList = ({ todos, editTodo, deleteTodo, changeTodoLabel }) => {
  console.log(todos);
  return (
    <>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              {...todo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              changeTodoLabel={changeTodoLabel}
            />
          );
        })}
      </ul>
    </>
  );
};
