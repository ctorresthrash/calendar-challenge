import React from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(30, "30 characters at most")
    .required("Required"),
  city: Yup.string().required("Required"),
  color: Yup.string().required("Required")
});

const ReminderForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      enableReinitialize
      onSubmit={onSubmit}
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
              label="Date"
              placeholder="Reminder's date"
              component={TextInput}
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
