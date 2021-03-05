import React from "react";
import styles from "./Navbar.module.scss";

import DropdownMenu from "../../components/UI/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "../../components/UI/DropdownMenu/DropdownMenuItem";
import { useModalContext } from "../../context/ModalContext/ModalContext";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { ReactComponent as Logo } from "../../assets/icons/timer.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { showModal } = useModalContext();
  const { isAuthenticated, user } = useAuthContext();

  const LoggedInMenu = () => (
    <DropdownMenu
      icon={<img src={user.image} alt="profile" className={styles.icon} />}
      className={styles.menu}
    >
      <DropdownMenuItem
        icon={<FontAwesomeIcon icon={["fas", "sign-out-alt"]} />}
        text="Log out"
        onClick={() => {
          window.location.href = "/api/user/logout";
        }}
      />
      <DropdownMenuItem
        icon={<FontAwesomeIcon icon={["fas", "trash-alt"]} />}
        text="Delete account"
        styling="red"
        onClick={() => {
          const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be reversed."
          );
          if (confirmed) {
            window.location.href = "/api/user/delete";
          }
        }}
      />
    </DropdownMenu>
  );
  const LoggedOutMenu = () => (
    <DropdownMenu
      icon={
        <FontAwesomeIcon
          icon={["fas", "user-circle"]}
          className={styles.icon}
        />
      }
      className={styles.menu}
    >
      <DropdownMenuItem
        icon={<FontAwesomeIcon icon={["fab", "google"]} />}
        text="Sign in with Google"
        onClick={() => {
          window.location.href = "/auth/google";
        }}
      />
    </DropdownMenu>
  );

  return (
    <nav className={styles.nav}>
      <h1>
        <Logo className={styles.logo} /> Pomotimer
      </h1>
      <ul>
        <li>
          <FontAwesomeIcon
            icon={["fas", "info-circle"]}
            className={styles.icon}
            onClick={() => showModal("INFO")}
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={["fas", "cog"]}
            className={styles.icon}
            onClick={() => showModal("SETTINGS")}
          />
        </li>
        <li>{isAuthenticated ? <LoggedInMenu /> : <LoggedOutMenu />}</li>
      </ul>
    </nav>
  );
}

export default Navbar;

/* <p>{isAuthenticated.toString()}</p>
        {isAuthenticated && (
          <>
            <p>{user._id}</p>
            <p>{user.googleId}</p>
            <p>{user.displayName}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.image}</p>
          </>
        )}
         */
