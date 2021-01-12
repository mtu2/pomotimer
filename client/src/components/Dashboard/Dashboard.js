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
        console.log("get got entries from database");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  async function handleCreateEntry(description, type, duration, startTime) {
    // Create entry data obj and remove description field if blank/whitespace
    const entryData = {
      description,
      type,
      duration,
      startTime,
    };
    if (!entryData.description.replace(/\s/g, "").length)
      delete entryData.description;

    // Instant card add for frontend
    setEntries((prevEntries) => [...prevEntries, entryData]);

    // Send to backend and update any changes (e.g. entry ._id)
    await entryAPI.create(entryData);
    // TODO: same code as fetchEntries - make into one function
    try {
      const res = await entryAPI.getAll();
      setEntries(res.data);
      console.log("get got entries from database");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteEntry(entryId) {
    // Instant card delete for frontend
    setEntries((prevEntries) => prevEntries.filter((el) => el._id !== entryId));

    // Send to backend
    await entryAPI.delete(entryId);
  }

  return (
    <>
      <div className={styles.header}>
        <h1>🌞 mtu-pomodoro</h1>
      </div>
      <div className={styles.dashboard}>
        <Timer handleCreateEntry={handleCreateEntry} />
        <EntryLog entries={entries} handleDeleteEntry={handleDeleteEntry} />
      </div>
    </>
  );
}

export default Dashboard;
