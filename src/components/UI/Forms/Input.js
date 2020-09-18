import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let labelElement = null;

  const classList = [classes.InputElement];
  let errorMessage = null;
  if (props.validation && props.validation.touched && !props.validation.valid) {
    classList.push(classes.Invalid);
    errorMessage = (
      <span className={classes.ValidationError}>
        {props.validation.errorMessage}
      </span>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.change}
          {...props.elementConfig}
          className={classList.join(" ")}
          value={props.value}
        />
      );
      break;

    case "textarea":
      classList.push(classes.TextAreaElement);
      inputElement = (
        <textarea
          onChange={props.change}
          {...props}
          className={classList.join(" ")}
          value={props.value}
        />
      );
      break;

    case "select":
      classList.push(classes.SelectElement);
      inputElement = (
        <select
          value={props.value}
          className={classList.join(" ")}
          onChange={props.change}
        >
          {props.elementConfig.options &&
            props.elementConfig.options.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.displayValue}
                </option>
              );
            })}
        </select>
      );
      break;

    default:
      break;
  }

  if (props.label) {
    labelElement = (
      <label className={classes.labelElement}>{props.label}</label>
    );
  }

  return (
    <div className={classes.InputDiv}>
      {labelElement}
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default Input;
