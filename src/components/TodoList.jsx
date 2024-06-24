import PropTypes from "prop-types";
import { useState } from "react";

import TodoItem from "./TodoItem";

import "../pages/styles/Todo.css";

export default function TodoList({ todos, setTodos }) {
  const [editMode, setEditMode] = useState(true);

  return (
    // add a button to change the edit mode
    // add a button to change the edit mode
    <>
      <div className="header-btn">
        <button className="btn btn-blue" onClick={() => setEditMode(!editMode)}>
          {editMode ? "View" : "Edit"}
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <TodoItem edit={editMode} todo={todo} setTodos={setTodos} />
          </li>
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
};
