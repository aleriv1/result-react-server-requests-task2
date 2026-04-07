import { Todo } from "../Todo/Todo";

export const TodoList = ({ todos }) => {
  return (
    <>
      <ul>
        {todos.map(({ id, title }) => {
          return <Todo key={id} todo={title} />;
        })}
      </ul>
    </>
  );
};
