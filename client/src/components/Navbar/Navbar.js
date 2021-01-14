import React from "react";
import styles from "./Navbar.module.scss";

import { useModalContext } from "../../context/ModalContext/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { showModal } = useModalContext();

  return (
    <nav className={styles.header}>
      <h1>🌞 mtu-pomodoro</h1>
      <ul>
        <li>
          <FontAwesomeIcon
            icon={["fas", "cog"]}
            className={styles.icon}
            onClick={() => showModal("SETTINGS")}
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={["fas", "user-circle"]}
            className={styles.icon}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
