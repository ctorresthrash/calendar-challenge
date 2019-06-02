import { payloadIdentity } from "../util/redux";
import { createActions, handleActions } from "redux-actions";
import uuid from "uuid/v1";
import { createSelector } from "reselect";
import * as R from "ramda";

const getCurrentReminder = createSelector(
  state => state.reminders,
  ({ currentReminder, reminders }) => {
    return reminders[currentReminder];
  }
);

const getAllReminders = createSelector(
  state => state.reminders,
  ({ reminders }) => {
    return reminders;
  }
);

const getRemindersByDay = createSelector(
  state => state.reminders,
  ({ reminders }) => {
    return R.pipe(
      Object.keys,
      R.map(key => reminders[key]),
      R.groupBy(reminder => reminder.date)
    )(reminders);
  }
);

export const selectors = {
  getCurrentReminder,
  getAllReminders,
  getRemindersByDay
};

const reminderPayload = payloadIdentity("reminder");

const createdActions = createActions({
  reminders: {
    ADD_REMINDER: reminderPayload,
    UPDATE_REMINDER: reminderPayload,
    DELETE_REMINDER: payloadIdentity("reminderId"),
    SET_CURRENT_REMINDER: reminderPayload
  }
}).reminders;

const initialState = {
  reminders: {},
  currentReminder: null
};

export const actions = {
  ...createdActions
};

export default handleActions(
  {
    reminders: {
      ADD_REMINDER: (state, action) => {
        const newReminderId = uuid();
        return {
          ...state,
          reminders: {
            ...state.reminders,
            [newReminderId]: {
              id: newReminderId,
              ...action.payload.reminder
            }
          }
        };
      },
      UPDATE_REMINDER: (state, action) => {
        return {
          ...state,
          reminders: {
            ...state.reminders,
            [action.payload.reminder.id]: action.payload.reminder
          }
        };
      },
      SET_CURRENT_REMINDER: (state, action) => {
        return { ...state, currentReminder: action.payload.reminder };
      }
    }
  },
  initialState
);
