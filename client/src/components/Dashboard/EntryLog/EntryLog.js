import React, { useState, useEffect } from "react";
import styles from "./EntryLog.module.scss";
import { entryAPI } from "../../../utils/API";

const Entry = (props) => {
  return (
    <div className={styles.entry}>
      <p>{`${props.description} ${props.type} ${props.duration} ${new Date(
        props.startTime
      )}`}</p>
    </div>
  );
};

function EntryLog() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async function fetchEntries() {
      try {
        const res = await entryAPI.getAll();
        setEntries(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.entryLog}>
      <div className={styles.tableHead}>
        <p>Today</p>
        <p>1h 36min</p>
      </div>
      <div className={styles.exampleEntry}>
        <p>🍅</p>
        <p>Working on Pomodoro</p>
        <p>13:30:23</p>
        <p>25:00</p>
      </div>

      <div className={styles.tableHead}>
        <p>Sun, 10 Jan</p>
        <p>2🍅, 0h 50min</p>
      </div>
      <div className={styles.exampleEntry}>
        <p>🍅</p>
        <p>Working on Pomodoro</p>
        <p>9:45:05</p>
        <p>25:00</p>
      </div>
      <div className={styles.exampleEntry}>
        <p>☕</p>
        <p>Working on Pomodoro</p>
        <p>9:40:05</p>
        <p>5:00</p>
      </div>
      <div className={styles.exampleEntry}>
        <p>🍅</p>
        <p>Working on Pomodoro</p>
        <p>9:15:05</p>
        <p>25:00</p>
      </div>
      {entries.map((entryData, index) => (
        <Entry key={index} {...entryData} />
      ))}
    </div>
  );
}

export default EntryLog;
