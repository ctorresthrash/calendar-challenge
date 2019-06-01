import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import R from "ramda";
import { format, parse } from "date-fns";

const TextInput = ({
  field: { name, ...field },
  form: { touched, errors },
  placeholder,
  label,
  type,
  ...props
}) => {
  const error = R.propOr(null, name, errors);
  const touch = R.propOr(false, name, touched);
  const isInvalid = touch && error;
  const dateProps = {
    defaultValue: format(new Date(), "YYYY-MM-DD"),
    value: field.value ? format(parse(field.value), "YYYY-MM-DD") : ""
  };
  const [innerType, setInnerType] = useState("text");
  const onFocus = () => {
    if ((type === "date" || type === "time") && innerType === "text") {
      setInnerType(type);
    }
  };
  const onBlur = () => {
    if ((type === "date" || type === "time") && innerType !== "text") {
      setInnerType("text");
    }
  };

  return (
    <FormGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        type={innerType}
        name={name}
        placeholder={placeholder}
        {...field}
        invalid={isInvalid ? true : null}
        {...props}
        {...innerType === "date" && dateProps}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};

TextInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

TextInput.defaultProps = {
  type: "text"
};

export default TextInput;
