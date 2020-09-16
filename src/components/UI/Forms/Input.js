import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let labelElement = null;

  switch (props.inputtype) {
    case "input":
      inputElement = <input {...props} className={classes.InputElement} />;
      break;

    case "textarea":
      inputElement = (
        <textarea {...props} className={classes.textAreaElement} />
      );
      break;

    case "select":
      inputElement = <select></select>;
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
