import React, { useState } from "react";
import styles from "./EntryModal.module.scss";

import ModalWrapper from "./ModalWrapper/ModalWrapper";
import { useEntryContext } from "../../context/EntryContext/EntryContext";
import { ReactComponent as TomatoIcon } from "../../assets/icons/tomato.svg";
import { ReactComponent as CoffeeIcon } from "../../assets/icons/coffee.svg";
import { ReactComponent as CoffeePotIcon } from "../../assets/icons/coffee-pot.svg";

const TYPES_DEFAULT_DESCRIPTION_DICT = {
  p: "Pomodoro",
  sb: "Short Break",
  lb: "Long Break",
};
// const TYPES_STYLES_DICT = {
//   p: styles.pomodoro,
//   sb: styles.shortBreak,
//   lb: styles.longBreak,
// };
const TYPES_ICONS_DICT = {
  p: <TomatoIcon className={styles.inlineIcon} title="Pomodoro" />,
  sb: <CoffeeIcon className={styles.inlineIcon} title="Short Break" />,
  lb: <CoffeePotIcon className={styles.inlineIcon} title="Long Break" />,
};

// Custom hook
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
}

function EntryModal(props) {
  const { updateEntry } = useEntryContext();
  const description = useFormInput(props.description || "");
  const type = useFormInput(props.type);
  const duration = useFormInput(props.duration);
  const startTime = useFormInput(new Date(props.startTime));

  function handleOnClose() {
    console.log("ENTRY MODAL CLOSED");
    updateEntry(
      props._id,
      description.value,
      type.value,
      duration.value,
      new Date(startTime.value)
    );
  }

  return (
    <ModalWrapper onClose={handleOnClose}>
      <form className={styles.entryModal}>
        <h2>Edit Entry</h2>
        <label className={styles.type}>
          Type:
          <select value={type} {...type}>
            <option value="p">
              {TYPES_ICONS_DICT["p"]} {TYPES_DEFAULT_DESCRIPTION_DICT["p"]}
            </option>
            <option value="sb">
              {TYPES_ICONS_DICT["sb"]} {TYPES_DEFAULT_DESCRIPTION_DICT["sb"]}
            </option>
            <option value="lb">
              {TYPES_ICONS_DICT["lb"]} {TYPES_DEFAULT_DESCRIPTION_DICT["lb"]}
            </option>
          </select>
        </label>
        <label className={styles.description}>
          Description:
          <input
            type="text"
            placeholder="I'm focusing on..."
            {...description}
          ></input>
        </label>
        <label className={styles.duration}>
          Duration:
          <input type="number" {...duration}></input>
        </label>
        <label className={styles.startTime}>
          Start Time:
          <input type="text" {...startTime}></input>
        </label>
      </form>
    </ModalWrapper>
  );
}

export default EntryModal;