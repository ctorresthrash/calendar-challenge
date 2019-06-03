import ReminderForm, { validate } from "./ReminderForm";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { wait, fireEvent, render, cleanup } from "@testing-library/react";
import thunk from "redux-thunk";

const allFieldRequiredErrors = {
  content: "Required",
  city: "Required",
  date: "Required",
  time: "Required",
  color: "Required"
};

const values30CharLong = {
  content:
    "this is a reminder content, who is supposed to be more than thirty characters long",
  city: "Cartagena",
  date: "2019-06-06",
  time: "13:00",
  color: "#000"
};

const validValues = {
  content: "this is a short reminder",
  city: "Cartagena",
  date: "2019-06-06",
  time: "13:00",
  color: "#000"
};

const emptyValues = { content: "", city: "", date: "", time: "", color: "" };

describe("ReminderForm component", () => {
  describe("validation function", () => {
    test("must return proper values when submitted form is empty", () => {
      expect(validate(emptyValues)).toEqual(allFieldRequiredErrors);
      expect(
        validate({
          content: null,
          city: null,
          date: null,
          time: null,
          color: null
        })
      ).toEqual(allFieldRequiredErrors);
      expect(
        validate({
          content: undefined,
          city: undefined,
          date: undefined,
          time: undefined,
          color: undefined
        })
      ).toEqual(allFieldRequiredErrors);
    });
    test("content must not be more than 30 characters long", () => {
      expect(validate(values30CharLong)).toEqual({
        content: "30 chars at most"
      });
    });
    test("must show no errors when all proper values are set", () => {
      expect(validate(validValues)).toEqual({});
    });
  });

  describe("Component rendering", () => {
    let wrapper = null;
    let submitReminder = null;

    afterEach(cleanup);

    const buildComponent = values => {
      const mockStore = configureMockStore([thunk]);
      const store = mockStore({
        forecast: {
          forecast: null
        }
      });
      submitReminder = jest.fn();
      const _props = {
        submitReminder,
        initialValues: values
      };
      wrapper = render(
        <Provider store={store}>
          <ReminderForm {..._props} />
        </Provider>
      );
    };

    test("it must contain a form element", () => {
      buildComponent(emptyValues);
      expect(wrapper.container.querySelector("form")).toBeTruthy();
    });

    test("form must not submit when values are empty", async () => {
      buildComponent(emptyValues);
      const form = wrapper.container.querySelector("form");
      expect(submitReminder).toHaveBeenCalledTimes(0);
      fireEvent.submit(form);
      await wait(() => {
        expect(submitReminder).toHaveBeenCalledTimes(0);
      });
    });

    test("form must not submit when content is more than 30 characters long", async () => {
      buildComponent(values30CharLong);
      const form = wrapper.container.querySelector("form");
      expect(submitReminder).toHaveBeenCalledTimes(0);
      fireEvent.submit(form);
      await wait(() => {
        expect(submitReminder).toHaveBeenCalledTimes(0);
      });
    });

    test("form must submit when values are correct", async () => {
      buildComponent(validValues);
      const form = wrapper.container.querySelector("form");
      expect(submitReminder).toHaveBeenCalledTimes(0);
      fireEvent.submit(form);
      await wait(() => {
        expect(submitReminder).toHaveBeenCalledTimes(1);
        expect(submitReminder).toHaveBeenCalledWith(validValues);
      });
    });
  });
});
