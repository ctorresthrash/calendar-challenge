import ReminderForm, { validate } from "./ReminderForm";
import React from "react";
import { create } from "react-test-renderer";

const allFieldRequiredErrors = {
  content: "Required",
  city: "Required",
  date: "Required",
  time: "Required",
  color: "Required"
};

describe("ReminderForm component", () => {
  describe("validation function", () => {
    test("must return proper values when submitted form is empty", () => {
      expect(
        validate({ content: "", city: "", date: "", time: "", color: "" })
      ).toEqual(allFieldRequiredErrors);
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
      const values = {
        content:
          "this is a reminder content, who is supposed to be more than thirty characters long",
        city: "Cartagena",
        date: "2019-06-06",
        time: "13:00",
        color: "#000"
      };
      expect(validate(values)).toEqual({ content: "30 chars at most" });
    });
    test("must show no errors when all proper values are set", () => {
      const values = {
        content: "this is a short reminder",
        city: "Cartagena",
        date: "2019-06-06",
        time: "13:00",
        color: "#000"
      };
      expect(validate(values)).toEqual({});
    });
  });
});
