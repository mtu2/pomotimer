import React, { useState } from "react";
import styles from "./DropdownMenu.module.scss";
import OutsideClickHandler from "react-outside-click-handler";

const DropdownMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
    if (props.onClose) props.onClose();
  }
  function handleOpen() {
    setIsOpen(true);
    if (props.onOpen) props.onOpen();
  }

  return (
    <div className={`${styles.dropdownMenu} ${props.className}`}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div onClick={() => (isOpen ? handleClose() : handleOpen())}>
          {props.icon}
        </div>
        {isOpen && <div className={styles.dropdown}>{props.children}</div>}
      </OutsideClickHandler>
    </div>
  );
};

export default DropdownMenu;
