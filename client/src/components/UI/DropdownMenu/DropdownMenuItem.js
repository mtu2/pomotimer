import React from "react";
import styles from "./DropdownMenuItem.module.scss";

function DropdownMenuItem(props) {
  return (
    <div
      className={`${styles.dropdownMenuItem} ${styles[props.styling]}`}
      onClick={props.onClick}
    >
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
      <p>{props.text}</p>
    </div>
  );
}

export default DropdownMenuItem;
