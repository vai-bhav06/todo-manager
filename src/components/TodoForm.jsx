import React, { useState } from "react";

export default function TodoForm({ addTodo, initialText = "", initialDate = "", onSubmit }) {
const [text, setText] = useState(initialText);
const [dueDate, setDueDate] = useState(initialDate); // yyyy-mm-dd

const handleSubmit = (e) => {
e.preventDefault();
if (!text.trim()) return;
if (onSubmit) {
onSubmit(text, dueDate || null);
} else {
addTodo(text, dueDate || null);
}
setText("");
setDueDate("");
};

return ( <form onSubmit={handleSubmit} className="todo-form">
<input
type="text"
placeholder="Enter a task..."
value={text}
onChange={(e) => setText(e.target.value)}
/>
<input
type="date"
value={dueDate}
onChange={(e) => setDueDate(e.target.value)}
className="date-input"
/> <button type="submit">Add</button> </form>
);
}
