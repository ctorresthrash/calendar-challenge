import React, { useState, useCallback } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import "../calendar.css";
import { getWeekMap } from "../util/index";
import { getDaysInMonth, differenceInWeeks, isToday } from "date-fns";
import cx from "classnames";

const weekDays = getWeekMap();

const today = new Date();
const getArrayFromNumber = number => {
  console.log(number);
  const array = [];
  for (let i = 0; i <= number; i++) {
    array.push(i);
  }
  return array;
};

const getPreviousMonthDay = ({ year, month, offset }) => {
  const previousMonthDay = new Date(year, month - 1, 32 - offset);
  const daysInPreviousMonth = getDaysInMonth(
    new Date(previousMonthDay.getFullYear(), previousMonthDay.getMonth())
  );
  return daysInPreviousMonth - (offset - 1);
};

const getNextMonthDay = ({ year, month, offset }) => {
  const nextMonthDay = new Date(year, month + 1, offset + 1);
  return nextMonthDay.getDay();
};

const Calendar = () => {
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const weeksInMonth = Math.abs(
    differenceInWeeks(
      new Date(year, month, daysInMonth),
      new Date(year, month, 1)
    ) + 1
  );
  let countingDay = 0;
  const onChangeMonth = useCallback(
    ev => {
      setMonth(parseInt(ev.target.value, 10));
    },
    [setMonth]
  );
  console.log(month);
  return (
    <div>
      <div className="row">
        <div className="col">
          <FormGroup>
            <Label for="exampleSelect">Select Month</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={month}
              onChange={onChangeMonth}
            >
              <option label="January">0</option>
              <option label="February">1</option>
              <option label="March">2</option>
              <option label="April">3</option>
              <option label="May">4</option>
              <option label="June">5</option>
              <option label="July">6</option>
              <option label="August">7</option>
              <option label="September">8</option>
              <option label="October">9</option>
              <option label="November">10</option>
              <option label="December">11</option>
            </Input>
          </FormGroup>
        </div>
      </div>
      <div className="calendar">
        <div className="row m-0 p-0">
          {Object.keys(weekDays).map(day => (
            <div className="col text-center calendar-header" key={day}>
              {day}
            </div>
          ))}
        </div>
        {getArrayFromNumber(weeksInMonth).map(week => {
          return (
            <div className="row m-0 p-0">
              {Object.values(weekDays).map((day, dayIndex) => {
                let dayLabel = null;
                let isDayFromPreviousMonth = week === 0 && day < firstDay;
                let isDayFromNextMonth = countingDay > daysInMonth;
                const dayClasses = cx({
                  "calendar-weekend": day === 0 || day === 6,
                  "calendar-not-month":
                    isDayFromPreviousMonth || isDayFromNextMonth,
                  "calendar-today":
                    isToday(new Date(year, month, countingDay + 1)) &&
                    !isDayFromPreviousMonth
                });
                if (isDayFromPreviousMonth) {
                  dayLabel = getPreviousMonthDay({
                    year,
                    month,
                    offset: firstDay - day
                  });
                } else if (isDayFromNextMonth) {
                  dayLabel = getNextMonthDay({
                    year,
                    month,
                    offset: day - daysInMonth
                  });
                } else {
                  dayLabel = ++countingDay + "";
                }
                return (
                  <div
                    className={`col p-0 text-center calendar-day ${dayClasses}`}
                    key={`${dayIndex}`}
                  >
                    <label>{dayLabel}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
