import React, { useState } from "react";
import TodoForm from "./TodoForm";

export default function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);
  const [dateValue, setDateValue] = useState(todo.dueDate || "");

  const handleEditSave = () => {
    if (editing) {
      if (value.trim()) {
        editTodo(todo.id, value, dateValue || null);
      }
    }
    setEditing(!editing);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {editing ? (
        <div className="edit-area">
          <input
            className="edit-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        </div>
      ) : (
        <div className="todo-main">
          <span
            onClick={() => toggleComplete(todo.id)}
            className="todo-text"
            title="Click to toggle complete"
          >
            {todo.text}
          </span>

          <div className="meta">
            {/* SHOW CATEGORY */}
            {todo.category && (
              <span className="badge category">{todo.category}</span>
            )}

            {/* SHOW PRIORITY */}
            {todo.priority && (
              <span className={`badge priority ${todo.priority.toLowerCase()}`}>
                {todo.priority}
              </span>
            )}

            {/* SHOW DATE */}
            {todo.dueDate ? (
              <span className="badge date">Due: {todo.dueDate}</span>
            ) : (
              <span className="badge date none">No date</span>
            )}
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button onClick={handleEditSave}>{editing ? "Save" : "Edit"}</button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
