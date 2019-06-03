import React from "react";
import * as R from "ramda";
import Color from "color";
import "../calendar.css";

const Reminder = ({ reminder, children, onClick }) => {
  if (!R.isEmpty(reminder)) {
    const color = Color(reminder.color);
    return (
      <div
        className="calendar-reminder row justify-content-between align-items-center"
        style={{ backgroundColor: reminder.color }}
      >
        <div className="col-10 px-0" onClick={onClick}>
          <p
            style={{
              color: color.isDark() ? "#f2f2f2" : "#191919",
              cursor: "pointer"
            }}
          >
            {reminder.content}
          </p>
        </div>
        <div className="col-2 px-0">
          {typeof children === "function" ? children({ reminder }) : children}
        </div>
      </div>
    );
  }
  return null;
};

export default Reminder;
