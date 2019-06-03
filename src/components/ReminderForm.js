import React, { useCallback } from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import TextInput from "./TextInput";
import { format } from "date-fns";
import StateForecast from "../containers/StateForecast";

export const validate = values => {
  const errors = {};
  if (!values.content) {
    errors.content = "Required";
  } else if (values.content.length > 30) {
    errors.content = "30 chars at most";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.time) {
    errors.time = "Required";
  }
  if (!values.color) {
    errors.color = "Required";
  }
  return errors;
};

const ColorInput = ({ field: { value, name }, form: { setFieldValue } }) => {
  const onChangeColor = useCallback(
    ev => {
      setFieldValue(name, ev.target.value);
    },
    [name, setFieldValue]
  );
  return (
    <div className="row">
      <div className="col">
        <label>Reminder's display color</label>
        {` `}
        <input type="color" value={value} onChange={onChangeColor} />
      </div>
    </div>
  );
};

const ReminderForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize
      initialValues={initialValues}
      validate={validate}
      component={({ values }) => {
        return (
          <div>
            <div className="row">
              <div className="col">
                <StateForecast {...values} />
              </div>
            </div>
            <Form>
              <Field
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
              <Field name="color" component={ColorInput} />
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </div>
        );
      }}
    />
  );
};

export default ReminderForm;
