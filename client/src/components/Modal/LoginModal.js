import React from "react";
import styles from "./LoginModal.module.scss";

import ModalWrapper from "./ModalWrapper/ModalWrapper";
import googleLoginBtn from "../../assets/buttons/btn_google_signin_light_normal_web@2x.png";

function LoginModal() {
  function handleOnClose() {
    console.log("LOGIN MODAL CLOSED");
  }

  return (
    <ModalWrapper onClose={handleOnClose}>
      <div>
        <p>LOGIN MODAL</p>
        <a href="/auth/google" className={styles.googleLoginBtn}>
          <img src={googleLoginBtn} alt="Sign in with Google" />
        </a>
      </div>
    </ModalWrapper>
  );
}

export default LoginModal;
