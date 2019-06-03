import React, { useCallback } from "react";
import { actions } from "../reducers/reminders";
import { connect } from "react-redux";
import * as R from "ramda";

const DeleteAllReminders = connect(
  null,
  {
    deleteReminders: actions.deleteReminders
  }
)(({ reminders, deleteReminders }) => {
  const onClickDeleteAll = useCallback(() => {
    if (
      window.confirm("Do you want to delete ALL the reminders for this day?")
    ) {
      deleteReminders(reminders.map(R.propOr("", "id")));
    }
  }, [deleteReminders, reminders]);
  return (
    <i
      onClick={onClickDeleteAll}
      className="fa fa-trash"
      style={{ cursor: "pointer", color: "red" }}
    />
  );
});

export default DeleteAllReminders;
