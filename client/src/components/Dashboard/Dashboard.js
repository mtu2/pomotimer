import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";

import Timer from "./Timer/Timer";
import EntryLog from "./EntryLog/EntryLog";

import { entryAPI } from "../../utils/API";

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

  async function handleCreateEntry(description, type, duration, startTime) {
    // Create entry data obj and remove description field if not entered
    const entryData = {
      description,
      type,
      duration,
      startTime,
    };
    if (
      entryData.description === "" ||
      entryData.description === undefined ||
      entryData.description === null
    ) {
      delete entryData.description;
    }

    // Instant card add for frontend
    setEntries((prevEntries) => [...prevEntries, entryData]);

    // Send to backend and update any changes (e.g. entry ._id)
    await entryAPI.create(entryData);
    // TODO: same code as fetchEntries - make into one function
    try {
      const res = await entryAPI.getAll();
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.header}>
        <h1>🌞 mtu-pomodoro</h1>
      </div>
      <div className={styles.dashboard}>
        <Timer handleCreateEntry={handleCreateEntry} />
        <EntryLog entries={entries} />
      </div>
    </>
  );
}

export default Dashboard;
