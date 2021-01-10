import React from "react";
import styles from "./Dashboard.module.scss";

import Timer from "./Timer/Timer";
import EntryLog from "./EntryLog/EntryLog";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1>🌞 mtu-pomodoro</h1>
      <Timer />
      <EntryLog />
    </div>
  );
}

export default Dashboard;
