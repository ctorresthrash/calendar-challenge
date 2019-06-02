import React, { useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { format } from "date-fns";
import { connect } from "react-redux";
import { actions } from "../reducers/forecast";
import StateForecast from "../containers/StateForecast";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(30, "30 characters at most")
    .required("Required"),
  city: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  color: Yup.string().required("Required")
});

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

const FetchForecastReminderForm = connect(
  null,
  {
    fetchForecast: actions.fetchForecast,
    resetState: actions.resetState
  }
)(({ values, fetchForecast, resetState }) => {
  const { date, time, city } = values;
  useEffect(() => {
    if (date && time && city) {
      fetchForecast({ date, time, city });
    }
    return () => {
      resetState();
    };
  }, [date, time, city, fetchForecast, resetState]);
  return (
    <div>
      <div className="row">
        <div className="col">
          <StateForecast />
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
});

const ReminderForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      component={FetchForecastReminderForm}
    />
  );
};

export default ReminderForm;
