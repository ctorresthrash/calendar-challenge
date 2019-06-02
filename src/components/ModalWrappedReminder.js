import React, { useCallback } from "react";
import ModalWrapper from "./ModalWrapper";
import Reminder from "./Reminder";
import UpdateReminderForm from "../containers/UpdateReminderForm";
import { connect } from "react-redux";
import { actions } from "../reducers/reminders";
import * as R from "ramda";

const ModalWrappedReminder = connect(
  null,
  {
    setCurrentReminder: actions.setCurrentReminder
  }
)(({ reminder, setCurrentReminder }) => {
  if (!R.isEmpty(reminder)) {
    return (
      <ModalWrapper
        title="Update Reminder"
        render={({ hide }) => {
          const onSubmitSuccess = useCallback(() => {
            setCurrentReminder(null);
            hide();
          }, [hide]);
          return <UpdateReminderForm onSubmitSuccess={onSubmitSuccess} />;
        }}
      >
        {({ show }) => {
          const onClickReminder = useCallback(() => {
            setCurrentReminder(reminder.id);
            show();
          }, [show]);
          return (
            <div onClick={onClickReminder} style={{ cursor: "pointer" }}>
              <Reminder reminder={reminder} />
            </div>
          );
        }}
      </ModalWrapper>
    );
  }
  return null;
});

export default ModalWrappedReminder;
