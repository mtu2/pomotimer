import React, { useState, useEffect } from "react";
import styles from "./EntryLog.module.scss";
import { entryAPI } from "../../../utils/API";

const Entry = (props) => {
  return <div>entry</div>;
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
      {entries.map((entry) => (
        <Entry duration={entry.duration} />
      ))}
    </div>
  );
}

export default EntryLog;
