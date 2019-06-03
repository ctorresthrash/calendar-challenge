import React from "react";
import * as R from "ramda";
import Color from "color";
import "./calendar.css";
import cx from "classnames";

const Reminder = ({ reminder, children, onClick }) => {
  if (!R.isEmpty(reminder)) {
    const color = Color(reminder.color);
    const classname = cx({
      "dark-text": color.isLight(),
      "light-text": color.isDark()
    });
    return (
      <div
        className="calendar-reminder row justify-content-between align-items-center"
        style={{ backgroundColor: reminder.color }}
      >
        <div className="col-10 px-0" onClick={onClick}>
          <p className={classname}>{reminder.content}</p>
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
