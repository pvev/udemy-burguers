import React from "react";

import classes from "./Order.module.css";

const Order = (props) => {
  console.log(props.order);
  return (
    <div className={classes.Order}>
      {props.order.ingredients &&
        Object.keys(props.order.ingredients).map((key, i) => {
          return (
            <span style={{ margin: "0 7px" }} key={key + i}>
              {key}: ({props.order.ingredients[key]})
            </span>
          );
        })}
      <p>
        Price: <strong>{props.order.price}</strong>
      </p>
    </div>
  );
};

export default Order;
