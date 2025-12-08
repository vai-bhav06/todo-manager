import React from "react";

export default function TodoFilter({ filter, setFilter, selectedDate, clearSelectedDate }) {
return ( <div className="filter">
<button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
All </button>
<button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
Completed </button>
<button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
Pending </button>
<button
className={filter === "day" ? "active" : ""}
onClick={() => {
if (selectedDate) setFilter("day");
}}
title={selectedDate ? `Showing ${selectedDate}` : "Select a day on the calendar"}
>
Selected Day </button>


  {selectedDate && (
    <div className="selected-day">
      <span>{selectedDate}</span>
      <button className="clear-day" onClick={clearSelectedDate}>Clear</button>
    </div>
  )}
</div>


);
}
