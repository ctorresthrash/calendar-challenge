import React, { useCallback } from "react";
import ReminderForm from "../components/ReminderForm";
import { connect } from "react-redux";
import { actions } from "../reducers/reminders";

const getInitialValues = () => ({
  content: "",
  city: "",
  date: ""
});

const AddReminderForm = connect(
  null,
  {
    addReminder: actions.addReminder
  }
)(({ addReminder, onSubmitSuccess }) => {
  const onSubmit = useCallback(
    data => {
      addReminder(data);
      typeof onSubmitSuccess === "function" && onSubmitSuccess();
    },
    [addReminder, onSubmitSuccess]
  );
  return (
    <ReminderForm onSubmit={onSubmit} initialValues={getInitialValues()} />
  );
});

AddReminderForm.displayName = "AddReminderForm";

export default AddReminderForm;