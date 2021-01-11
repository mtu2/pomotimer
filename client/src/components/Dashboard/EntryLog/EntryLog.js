import React, { useState, useEffect } from "react";
import styles from "./EntryLog.module.scss";

import { entryAPI } from "../../../utils/API";
import {
  formatSecToMinSec,
  formatSecToHourMin,
  formatDateToDayMonth,
} from "../../../utils/times";

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

const EntryRow = (props) => {
  return (
    <div className={`${styles.entryRow} ${TYPES_STYLES_DICT[props.type]}`}>
      <p>{`${props.type} ${
        props.description || TYPES_DEFAULT_DESCRIPTION_DICT[props.type]
      }`}</p>
      <p className={styles.duration}>{formatSecToMinSec(props.duration)}</p>
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
            {calcTotalPomodoros()}🍅, {calcTotalPomodoroTime()}
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

function EntryLog() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async function fetchEntries() {
      try {
        const res = await entryAPI.getAll();
        setEntries(res.data);

        // console.log(res.data[0].startTime);
        // console.log(new Date(res.data[0].startTime));
        // console.log(
        //   new Date(res.data[0].startTime) - new Date(res.data[1].startTime)
        // );
        // console.log(new Date(res.data[0].startTime).getDate());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function sortEntries() {
    if (entries.length === 0) return [[]];

    const returnEntries = [];
    const dupEntries = [...entries];
    dupEntries.sort((a, b) => new Date(b.startTime) > new Date(a.startTime));

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
      {sortEntries().map((tableData, index) => (
        <EntryTable tableData={tableData} key={index} />
      ))}
    </div>
  );
}

export default EntryLog;
