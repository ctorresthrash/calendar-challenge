import { payloadIdentity } from "../util/redux";
import { createActions, handleActions } from "redux-actions";
import uuid from "uuid/v1";

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
  reminders: [],
  currentReminder: null
};

export const actions = {
  ...createdActions
};

export default handleActions(
  {
    reminders: {
      ADD_REMINDER: (state, action) => {
        return {
          ...state,
          reminders: [
            ...state.reminders,
            { ...action.payload.reminder, id: uuid() }
          ]
        };
      }
    }
  },
  initialState
);
