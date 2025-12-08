import React, { useState } from "react";

/**
 * Calendar component (fixed):
 * Props:
 * - tasksCountByDate: { "YYYY-MM-DD": number }
 * - onDayClick(dateStr)
 * - weekStart: 0 (Sunday) or 1 (Monday). Default 0.
 */
function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function toLocalISO(y, m0, d) {
  // m0 = 0-indexed month
  return `${y}-${pad(m0 + 1)}-${pad(d)}`;
}

export default function Calendar({
  tasksCountByDate = {},
  onDayClick = () => {},
  weekStart = 0, // 0 = Sunday, 1 = Monday
}) {
  const now = new Date();
  const todayISO = toLocalISO(now.getFullYear(), now.getMonth(), now.getDate());

  // viewDate is always the 1st of the month we are viewing
  const [viewDate, setViewDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-indexed

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // getDay() returns 0..6 where 0=Sun. Normalize to weekStart.
  const rawStart = new Date(year, month, 1).getDay(); // 0=Sun
  const startWeekday = (rawStart - weekStart + 7) % 7; // 0..6 where 0 is first column

  // Build weeks array
  const weeks = [];
  let day = 1 - startWeekday; // first cell value (may be negative/null)

  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++, day++) {
      if (day < 1 || day > daysInMonth) {
        week.push(null);
      } else {
        // Use local ISO (no timezone conversion)
        const iso = toLocalISO(year, month, day);
        week.push({ day, iso });
      }
    }
    weeks.push(week);
  }

  const prevMonth = () =>
    setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setViewDate(new Date(year, month + 1, 1));

  // Weekday labels that respect weekStart
  const weekdayLabels = weekStart === 1
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar">
      <div className="cal-header">
        <button onClick={prevMonth}>{"<"}</button>
        <div className="cal-title">
          {viewDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      <div className="cal-grid">
        {weekdayLabels.map((lbl) => (
          <div key={lbl} className="cal-weekday">{lbl}</div>
        ))}

        {weeks.map((week, wi) =>
          week.map((cell, ci) => {
            if (!cell) {
              return <div key={`${wi}-${ci}`} className="cal-cell empty" />;
            }
            const count = tasksCountByDate[cell.iso] || 0;
            const isToday = cell.iso === todayISO;

            return (
              <div
                key={`${wi}-${ci}`}
                className={`cal-cell ${isToday ? "today" : ""}`}
                onClick={() => onDayClick(cell.iso)}
                title={`${count} task${count !== 1 ? "s" : ""}`}
              >
                <div className="cell-day">{cell.day}</div>
                {count > 0 && <div className="cell-badge">{count}</div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
