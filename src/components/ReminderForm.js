import React from "react";
import { Button } from "reacts";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .length(30, "30 characters at most")
    .required("Required"),
  city: Yup.string().required("Required"),
  color: Yup.string().required("Required")
});

const ReminderForm = ({ onSubmit }) => {
  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema}>
      {() => {
        return (
          <Form>
            <Field
              name="content"
              label="Content"
              placeholder="Enter your reminder"
            />
            <Field name="city" label="City" placeholder="Enter your city" />
            <Button color="primary">Submit</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReminderForm;
