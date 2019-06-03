import React, { useCallback } from "react";
import ModalWrapper from "./ModalWrapper";
import Reminder from "./Reminder";
import UpdateReminderForm from "../containers/UpdateReminderForm";
import { connect } from "react-redux";
import { actions } from "../reducers/reminders";
import * as R from "ramda";
import Color from "color";

const ModalWrappedReminder = connect(
  null,
  {
    setCurrentReminder: actions.setCurrentReminder,
    deleteReminders: actions.deleteReminders
  }
)(({ reminder, setCurrentReminder, deleteReminders }) => {
  if (!R.isEmpty(reminder)) {
    const color = Color(reminder.color);
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

          const onClickDelete = useCallback(() => {
            if (window.confirm("Do you want to delete this reminder?")) {
              deleteReminders([reminder.id]);
            }
          }, []);
          return (
            <Reminder reminder={reminder} onClick={onClickReminder}>
              <div style={{ cursor: "pointer" }} onClick={onClickDelete}>
                <i
                  className="fa fa-times"
                  style={{ color: color.isDark() ? "#f2f2f2" : "#191919" }}
                />
              </div>
            </Reminder>
          );
        }}
      </ModalWrapper>
    );
  }
  return null;
});

export default ModalWrappedReminder;
