import React, { useCallback } from "react";
import { actions } from "../reducers/reminders";
import { Button } from "reactstrap";
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
    <Button onClick={onClickDeleteAll} color="danger" size="sm">
      Delete All <i className="fa fa-times" />
    </Button>
  );
});

export default DeleteAllReminders;
