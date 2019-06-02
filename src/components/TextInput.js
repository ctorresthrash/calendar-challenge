import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import * as R from "ramda";

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
  const [innerType, setInnerType] = useState(
    type === "date" || type === "time" ? "text" : type
  );
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
