import React from "react";
import styles from "./LoginModal.module.scss";

import { useAuthContext } from "../../context/AuthContext/AuthContext";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import googleLoginBtn from "../../assets/buttons/btn_google_signin_light_normal_web@2x.png";

function LoginModal() {
  const { isAuthenticated, user } = useAuthContext();

  function handleOnClose() {
    console.log("LOGIN MODAL CLOSED");
  }

  return (
    <ModalWrapper onClose={handleOnClose}>
      <div className={styles.loginModal}>
        <p>LOGIN MODAL</p>
        <a href="/auth/google" className={styles.googleLoginBtn}>
          <img src={googleLoginBtn} alt="Sign in with Google" />
        </a>
        <p></p>
        <p>{isAuthenticated.toString()}</p>
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
        <a href="/api/logout">LOG OUT</a>
      </div>
    </ModalWrapper>
  );
}

export default LoginModal;
