import React from "react";
import styles from "./EntryLog.module.scss";

import { useModalContext } from "../../../context/ModalContext/ModalContext";
import { useEntryContext } from "../../../context/EntryContext/EntryContext";
import { useSettingsContext } from "../../../context/SettingsContext/SettingsContext";
import { useTypesEmoji } from "../../../hooks/useTypesEmoji";
import {
  formatSecToMinSec2,
  formatSecToHourMin,
  formatDateToDayMonth,
  formatDateToHourMin,
} from "../../../utils/times";
import { TYPES_DEFAULT_DESCRIPTION_DICT } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TYPES_STYLES_DICT = {
  p: styles.pomodoro,
  sb: styles.shortBreak,
  lb: styles.longBreak,
};

const EntryRow = (props) => {
  const { showModal } = useModalContext();
  const typesEmoji = useTypesEmoji();
  const isOptimistic = props._id < 0;

  return (
    <div
      className={`${styles.entryRow} ${TYPES_STYLES_DICT[props.type]} ${
        isOptimistic && styles.optimistic
      }`}
    >
      <p className={styles.description}>
        {typesEmoji[props.type]} &nbsp;
        {props.description || TYPES_DEFAULT_DESCRIPTION_DICT[props.type]}
      </p>
      <p className={styles.startTime}>{formatDateToHourMin(props.startTime)}</p>
      <p className={styles.duration}>{formatSecToMinSec2(props.duration)}</p>

      <div className={styles.buttonContainer}>
        <button
          onClick={() => showModal("ENTRY", { ...props })}
          title="Edit entry"
          className={styles.editButton}
          disabled={isOptimistic}
        >
          <FontAwesomeIcon icon={["fas", "edit"]} className={styles.icon} />
        </button>
        <button
          onClick={() => props.handleDeleteEntry(props._id)}
          title="Delete"
          className={styles.deleteButton}
          disabled={isOptimistic}
        >
          <FontAwesomeIcon
            icon={["fas", "trash-alt"]}
            className={styles.icon}
          />
        </button>
      </div>
    </div>
  );
};

const EntryTable = (props) => {
  const typesEmoji = useTypesEmoji();

  const calcTotalPomodoros = () => {
    return props.tableData.filter((el) => el.type === "p").length;
  };
  const calcTotalPomodoroTime = () => {
    return formatSecToHourMin(
      props.tableData
        .filter((el) => el.type === "p")
        .reduce((total, el) => total + el.duration, 0)
    );
  };

  return (
    props.tableData.length > 0 && (
      <>
        <div className={styles.entryHead}>
          <p>{formatDateToDayMonth(props.tableData[0].startTime)}</p>
          <p>
            {calcTotalPomodoros()} {typesEmoji["p"]}, {calcTotalPomodoroTime()}
          </p>
        </div>
        <div className={styles.entryTable}>
          {props.tableData.map((entryData, index) => (
            <EntryRow
              key={index}
              {...entryData}
              handleDeleteEntry={props.handleDeleteEntry}
            />
          ))}
        </div>
      </>
    )
  );
};

function EntryLog() {
  const { state, deleteEntry } = useEntryContext();
  const {
    state: { showOnlyPomodoros },
  } = useSettingsContext();

  function sortEntries(unsortedEntries) {
    if (unsortedEntries.length === 0) return [[]];

    const returnEntries = [];
    let dupEntries = [...unsortedEntries];

    if (showOnlyPomodoros) {
      dupEntries = dupEntries.filter((el) => el.type === "p");
    }

    dupEntries.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    dupEntries.forEach((el) => {
      // Find and push into existing day array
      const a = new Date(el.startTime);
      for (let i = 0; i < returnEntries.length; i++) {
        const b = new Date(returnEntries[i][0].startTime);
        if (
          a.getDate() === b.getDate() &&
          a.getMonth() === b.getMonth() &&
          a.getFullYear() === b.getFullYear()
        ) {
          returnEntries[i].push(el);
          return;
        }
      }

      // Create new day array if not found
      returnEntries.push([el]);
    });

    return returnEntries;
  }

  return (
    <div className={styles.entryLog}>
      {state.length > 0 ? (
        sortEntries(state).map((tableData, index) => (
          <EntryTable
            tableData={tableData}
            key={index}
            handleDeleteEntry={(entryId) => deleteEntry(entryId)}
          />
        ))
      ) : (
        <p className={styles.noEntriesText}>
          There are currently no entries...
        </p>
      )}
    </div>
  );
}

export default EntryLog;
