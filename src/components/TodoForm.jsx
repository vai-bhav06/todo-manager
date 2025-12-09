import React, { useState, useEffect } from "react";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  // --- AI CATEGORY + PRIORITY + DATE DETECTION ---
  useEffect(() => {
    if (!text.trim()) {
      setCategory("");
      setPriority("");
      return;
    }

    const lower = text.toLowerCase();

    // === CATEGORY DETECTION ===
    if (lower.includes("meeting") || lower.includes("office") || lower.includes("call")) {
      setCategory("Work");
    } else if (lower.includes("buy") || lower.includes("purchase") || lower.includes("order")) {
      setCategory("Shopping");
    } else if (lower.includes("clean") || lower.includes("cook") || lower.includes("home")) {
      setCategory("Home");
    } else if (lower.includes("bill") || lower.includes("pay") || lower.includes("payment")) {
      setCategory("Finance");
    } else if (lower.includes("gym") || lower.includes("exercise") || lower.includes("walk")) {
      setCategory("Fitness");
    } else if (lower.includes("study") || lower.includes("read")) {
      setCategory("Study");
    } else {
      setCategory("General");
    }

    // === PRIORITY DETECTION ===
    if (lower.includes("urgent") || lower.includes("now") || lower.includes("asap")) {
      setPriority("High");
    } else if (lower.includes("today") || lower.includes("tomorrow")) {
      setPriority("Medium");
    } else {
      setPriority("Low");
    }

    // === NATURAL LANGUAGE DATE DETECTION ===
    const today = new Date();

    if (lower.includes("today")) {
      setDueDate(today.toISOString().slice(0, 10));
    }

    if (lower.includes("tomorrow")) {
      const d = new Date(today);
      d.setDate(d.getDate() + 1);
      setDueDate(d.toISOString().slice(0, 10));
    }

    if (lower.includes("next week")) {
      const d = new Date(today);
      d.setDate(d.getDate() + 7);
      setDueDate(d.toISOString().slice(0, 10));
    }

    if (lower.includes("next monday")) {
      const d = new Date();
      while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
      setDueDate(d.toISOString().slice(0, 10));
    }

  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      text,
      dueDate: dueDate || null,
      category,
      priority,
    };

    addTodo(newTask);

    setText("");
    setDueDate("");
    setCategory("");
    setPriority("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter a task... "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* AI SMART SUGGESTIONS */}
      {(category || priority || dueDate) && (
        <div className="ai-suggestions">
          {category && (
            <p className="badge blue">Category: {category}</p>
          )}
          {priority && (
            <p className={`badge ${priority === "High" ? "red" : priority === "Medium" ? "yellow" : "green"}`}>
              Priority: {priority}
            </p>
          )}
          {dueDate && (
            <p className="badge purple">Date: {dueDate}</p>
          )}
        </div>
      )}

      {/* DATE PICKER */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}
