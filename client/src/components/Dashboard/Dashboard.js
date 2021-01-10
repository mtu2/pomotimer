import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { entryAPI } from "../../utils/API";

import Timer from "./Timer/Timer";
import EntryLog from "./EntryLog/EntryLog";

function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async function fetchEntries() {
      try {
        const res = await entryAPI.getAll();
        setEntries(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Timer />
      <EntryLog />
    </div>
  );
}

export default Dashboard;
