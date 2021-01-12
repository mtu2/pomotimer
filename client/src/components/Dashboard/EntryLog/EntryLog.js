import React from "react";
import styles from "./EntryLog.module.scss";

import {
  formatSecToMinSec2,
  formatSecToHourMin,
  formatDateToDayMonth,
} from "../../../utils/times";
import { ReactComponent as TomatoIcon } from "../../../assets/icons/tomato.svg";
import { ReactComponent as CoffeeIcon } from "../../../assets/icons/coffee.svg";
import { ReactComponent as CoffeePotIcon } from "../../../assets/icons/coffee-pot.svg";

const TYPES_DEFAULT_DESCRIPTION_DICT = {
  p: "Pomodoro",
  sb: "Short Break",
  lb: "Long Break",
};
const TYPES_STYLES_DICT = {
  p: styles.pomodoro,
  sb: styles.shortBreak,
  lb: styles.longBreak,
};
const TYPES_ICONS_DICT = {
  p: <TomatoIcon className={styles.inlineIcon} />,
  sb: <CoffeeIcon className={styles.inlineIcon} />,
  lb: <CoffeePotIcon className={styles.inlineIcon} />,
};

const EntryRow = (props) => {
  return (
    <div className={`${styles.entryRow} ${TYPES_STYLES_DICT[props.type]}`}>
      <p>
        {TYPES_ICONS_DICT[props.type]}&nbsp;&nbsp;
        {props.description || TYPES_DEFAULT_DESCRIPTION_DICT[props.type]}
      </p>
      <p className={styles.duration}>{formatSecToMinSec2(props.duration)}</p>
    </div>
  );
};

const EntryTable = (props) => {
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
            {calcTotalPomodoros()} <TomatoIcon className={styles.inlineIcon} />,{" "}
            {calcTotalPomodoroTime()}
          </p>
        </div>
        <div className={styles.entryTable}>
          {props.tableData.map((entryData, index) => (
            <EntryRow key={index} {...entryData} />
          ))}
        </div>
      </>
    )
  );
};

function EntryLog(props) {
  function sortEntries(unsortedEntries) {
    if (unsortedEntries.length === 0) return [[]];

    const returnEntries = [];
    const dupEntries = [...unsortedEntries];

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
      {sortEntries(props.entries).map((tableData, index) => (
        <EntryTable tableData={tableData} key={index} />
      ))}
    </div>
  );
}

export default EntryLog;
