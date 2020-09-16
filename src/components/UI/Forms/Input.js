import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let labelElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.change}
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          onChange={props.change}
          {...props}
          className={classes.textAreaElement}
          value={props.value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          value={props.value}
          className={classes.Select}
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
    </div>
  );
};

export default Input;
