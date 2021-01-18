import React from "react";
import styles from "./Navbar.module.scss";

import { useModalContext } from "../../context/ModalContext/ModalContext";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { showModal } = useModalContext();
  const { isAuthenticated, user } = useAuthContext();

  return (
    <nav className={styles.nav}>
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
          {isAuthenticated ? (
            <img
              src={user.image}
              alt="profile"
              className={styles.icon}
              onClick={() => showModal("LOGIN")}
            />
          ) : (
            <FontAwesomeIcon
              icon={["fas", "user-circle"]}
              className={styles.icon}
              onClick={() => showModal("LOGIN")}
            />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
