import React from "react";
import * as R from "ramda";
import Color from "color";
import "../calendar.css";

const Reminder = ({ reminder }) => {
  if (!R.isEmpty) {
    const color = Color(reminder.color);
    return (
      <div className="calendar-reminder" style={{ backgroundColor: color.hex }}>
        <label style={{ color: color.isDark() ? "#f2f2f2" : "#191919" }}>
          {reminder.content}
        </label>
      </div>
    );
  }
  return null;
};

export default Reminder;
