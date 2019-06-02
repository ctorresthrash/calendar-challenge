import React, { useCallback } from "react";
import ReminderForm from "../components/ReminderForm";
import { connect } from "react-redux";
import { actions, selectors } from "../reducers/reminders";

const UpdateReminderForm = connect(
  state => ({
    initialValues: selectors.getCurrentReminder(state)
  }),
  {
    updateReminder: actions.updateReminder
  }
)(({ updateReminder, onSubmitSuccess, initialValues }) => {
  const onSubmit = useCallback(
    data => {
      updateReminder(data);
      typeof onSubmitSuccess === "function" && onSubmitSuccess();
    },
    [updateReminder, onSubmitSuccess]
  );
  return <ReminderForm onSubmit={onSubmit} initialValues={initialValues} />;
});

UpdateReminderForm.displayName = "UpdateReminderForm";

export default UpdateReminderForm;
