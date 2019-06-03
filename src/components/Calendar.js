import React, { useState, useCallback } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import "../calendar.css";
import { getWeekMap, getMonthMap } from "../util/index";
import { getDaysInMonth, isToday, format } from "date-fns";
import cx from "classnames";
import ModalWrapper from "./ModalWrapper";
import AddReminderForm from "../containers/AddReminderForm";
import { connect } from "react-redux";
import { selectors } from "../reducers/reminders";
import Reminder from "./ModalWrappedReminder";
import * as R from "ramda";
import DeleteAllReminders from "../containers/DeleteAllReminders";

const weekDays = getWeekMap();
const months = getMonthMap();

const today = new Date();

const getPreviousMonthDay = ({ year, month, offset }) => {
  const previousMonthDay = new Date(year, month - 1, 32 - offset);
  const daysInPreviousMonth = getDaysInMonth(
    new Date(previousMonthDay.getFullYear(), previousMonthDay.getMonth())
  );
  return daysInPreviousMonth - (offset - 1);
};

function dayOccurrencesPerMonth({ year, month, day }) {
  var dayCount, counter, date;
  dayCount = 1;
  counter = 0;
  date = new Date(year, month, dayCount);
  while (date.getMonth() === month) {
    if (date.getDay() === day) {
      counter += 1;
    }
    dayCount += 1;
    date = new Date(year, month, dayCount);
  }
  return counter + 1;
}

const arrayFromNumber = number => {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(i);
  }
  return array;
};

const Calendar = ({ reminders }) => {
  const [month, setMonth] = useState(today.getMonth());
  const [year] = useState(today.getFullYear());
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const lastDay = new Date(year, month, daysInMonth).getDay();
  let countingDay = 1;
  let offsetDay = 1;
  const onChangeMonth = useCallback(
    ev => {
      setMonth(parseInt(ev.target.value, 10));
    },
    [setMonth]
  );
  return (
    <div>
      <div className="row align-items-end">
        <div className="col-6">
          <FormGroup>
            <Label for="exampleSelect">Select Month</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              value={month}
              onChange={onChangeMonth}
            >
              {Object.keys(months).map(m => (
                <option key={m} label={m}>
                  {months[m]}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
        <div className="col-6 text-right mb-3">
          <ModalWrapper
            title="Add Reminder"
            render={({ hide }) => <AddReminderForm onSubmitSuccess={hide} />}
          >
            {({ show }) => (
              <Button color="primary" onClick={show}>
                Add Reminder
              </Button>
            )}
          </ModalWrapper>
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
        {arrayFromNumber(
          dayOccurrencesPerMonth({ year, month, day: lastDay })
        ).map(week => {
          if (countingDay > daysInMonth) {
            return null;
          }
          return (
            <div className="row m-0 p-0">
              {Object.values(weekDays).map((day, dayIndex) => {
                let dayLabel = null;
                let isDayFromPreviousMonth = week === 0 && day < firstDay;
                let isDayFromNextMonth = countingDay > daysInMonth;
                let dayDate = format(
                  new Date(year, month, countingDay + offsetDay - 1),
                  "YYYY-MM-DD"
                );
                let dayReminders = reminders[dayDate] || [];
                const dayClasses = cx({
                  "calendar-weekend": day === 0 || day === 6,
                  "calendar-offset":
                    isDayFromPreviousMonth || isDayFromNextMonth,
                  "calendar-today":
                    isToday(new Date(year, month, countingDay)) &&
                    !isDayFromPreviousMonth
                });
                if (isDayFromPreviousMonth) {
                  dayLabel = getPreviousMonthDay({
                    year,
                    month,
                    offset: firstDay - day
                  });
                } else if (isDayFromNextMonth) {
                  dayLabel = `${offsetDay++}`;
                } else {
                  dayLabel = `${countingDay++}`;
                }
                return (
                  <div
                    className={`col p-0 text-center calendar-day ${dayClasses}`}
                    key={`${dayIndex}`}
                  >
                    <div className="row justify-content-between mb-1">
                      <div className="col-auto pl-4">
                        <label>{dayLabel}</label>
                      </div>
                      {!R.isEmpty(dayReminders) && (
                        <div className="col-auto">
                          <DeleteAllReminders reminders={dayReminders} />
                        </div>
                      )}
                    </div>
                    <div className="row calendar-reminder-container">
                      {!R.isEmpty(dayReminders) &&
                        dayReminders.map(reminder => (
                          <div className="col-12">
                            <Reminder key={reminder.id} reminder={reminder} />
                          </div>
                        ))}
                    </div>
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

export default connect(state => ({
  reminders: selectors.getRemindersByDay(state)
}))(Calendar);
