import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import Calendar from "./components/Calendar";
import "./App.css";

export default function App() {
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all"); // all, completed, pending, day
const [selectedDate, setSelectedDate] = useState(null); // "YYYY-MM-DD"

// Load from LocalStorage
useEffect(() => {
const saved = JSON.parse(localStorage.getItem("todos"));
if (saved) setTodos(saved);
}, []);

// Save to LocalStorage
useEffect(() => {
localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const addTodo = (text, dueDate = null) => {
setTodos([...todos, { id: Date.now(), text, completed: false, dueDate }]);
};

const toggleComplete = (id) => {
setTodos(
todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
);
};

const deleteTodo = (id) => {
setTodos(todos.filter((t) => t.id !== id));
};

const editTodo = (id, newText, newDate) => {
setTodos(
todos.map((t) =>
t.id === id ? { ...t, text: newText, dueDate: newDate } : t
)
);
};

const filteredTodos = (() => {
if (filter === "all") return todos;
if (filter === "completed") return todos.filter((t) => t.completed);
if (filter === "pending") return todos.filter((t) => !t.completed);
if (filter === "day" && selectedDate)
return todos.filter((t) => t.dueDate === selectedDate);
return todos;
})();

const tasksCountByDate = todos.reduce((acc, t) => {
if (t.dueDate) acc[t.dueDate] = (acc[t.dueDate] || 0) + 1;
return acc;
}, {});

return ( <div className="app"> <h1>To-Do Manager</h1>


  <div className="top-row">
    <TodoForm addTodo={addTodo} />
    <Calendar
      tasksCountByDate={tasksCountByDate}
      onDayClick={(date) => {
        setSelectedDate(date);
        setFilter("day");
      }}
    />
  </div>

  <TodoFilter
    filter={filter}
    setFilter={(f) => {
      setFilter(f);
      if (f !== "day") setSelectedDate(null);
    }}
    selectedDate={selectedDate}
    clearSelectedDate={() => {
      setSelectedDate(null);
      setFilter("all");
    }}
  />

  <div className="todo-list">
    {filter === "day" && selectedDate && (
      <p className="showing-day">Showing tasks for: {selectedDate}</p>
    )}
    {filteredTodos.length === 0 ? (
      <p className="empty">No tasks found</p>
    ) : (
      filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))
    )}
  </div>
</div>

);
}
