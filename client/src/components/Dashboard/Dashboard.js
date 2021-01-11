import React from "react";
import styles from "./Dashboard.module.scss";

import Timer from "./Timer/Timer";
import EntryLog from "./EntryLog/EntryLog";

function Dashboard() {
  return (
    <>
      <div className={styles.header}>
        <h1>🌞 mtu-pomodoro</h1>
      </div>
      <div className={styles.dashboard}>
        <Timer />
        <EntryLog />
      </div>
    </>
  );
}

export default Dashboard;
