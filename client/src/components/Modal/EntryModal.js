import React from "react";
import styles from "./EntryModal.module.scss";

import ModalWrapper from "./ModalWrapper/ModalWrapper";
import { useEntryContext } from "../../context/EntryContext/EntryContext";
import { useFormInput } from "../../hooks/useFormInput";
import { useTypesEmoji } from "../../hooks/useTypesEmoji";
import {
  getMinutesFromSeconds,
  getSecondsMinusMinutes,
  formatDateToDayMonthYear,
  formatDateToHourMinSec,
  calcDate,
} from "../../utils/times";
import { TYPES_DEFAULT_DESCRIPTION_DICT } from "../../utils/types";

function EntryModal(props) {
  const { updateEntry } = useEntryContext();
  const typesEmoji = useTypesEmoji();

  const description = useFormInput(props.description || "");
  const type = useFormInput(props.type);

  const durationMin = useFormInput(getMinutesFromSeconds(props.duration));
  const durationSec = useFormInput(getSecondsMinusMinutes(props.duration));

  const initStartTime = new Date(props.startTime);
  const startTimeHMS = useFormInput(formatDateToHourMinSec(props.startTime));
  const startTimeDMY = useFormInput(formatDateToDayMonthYear(props.startTime));

  function handleOnClose() {
    updateEntry(
      props._id,
      description.value,
      type.value,
      durationMin.value * 60 + durationSec.value,
      calcDate(startTimeHMS.value, startTimeDMY.value, initStartTime)
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
              {typesEmoji["p"]} {TYPES_DEFAULT_DESCRIPTION_DICT["p"]}
            </option>
            <option value="sb">
              {typesEmoji["sb"]} {TYPES_DEFAULT_DESCRIPTION_DICT["sb"]}
            </option>
            <option value="lb">
              {typesEmoji["lb"]} {TYPES_DEFAULT_DESCRIPTION_DICT["lb"]}
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
          <div className={styles.durationInputContainer}>
            <div className={styles.durationInput}>
              <input type="text" {...durationMin}></input>m
            </div>
            <div className={styles.durationInput}>
              <input type="text" {...durationSec}></input>s
            </div>
          </div>
        </label>
        <label className={styles.startTime}>
          Start Time:
          <div className={styles.startTimeInputContainer}>
            <input type="text" {...startTimeHMS}></input>
            <input type="text" {...startTimeDMY}></input>
          </div>
        </label>
      </form>
    </ModalWrapper>
  );
}

export default EntryModal;
