import React from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { format } from "date-fns";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(30, "30 characters at most")
    .required("Required"),
  city: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  color: Yup.string().required("Required")
});

const ReminderForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <Field
              type="textarea"
              name="content"
              label="Content"
              placeholder="Enter your reminder"
              component={TextInput}
            />
            <Field
              name="city"
              label="City"
              placeholder="Enter your city"
              component={TextInput}
            />
            <Field
              type="date"
              name="date"
              min={format(new Date(), "YYYY-MM-DD")}
              label="Date"
              placeholder="Reminder's date"
              component={TextInput}
            />
            <Field
              type="time"
              name="time"
              min={format(new Date(), "HH:mm a")}
              label="Time"
              placeholder="Reminder's Time"
              component={TextInput}
            />
            <Field
              name="color"
              component={({ field: { name, value, onChange } }) => {
                return (
                  <div className="row">
                    <div className="col">
                      <label>Reminder's display color</label>
                      {` `}
                      <input type="color" value={value} onChange={onChange} />
                    </div>
                  </div>
                );
              }}
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReminderForm;
