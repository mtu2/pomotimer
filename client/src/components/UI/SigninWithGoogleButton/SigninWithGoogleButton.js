import React from "react";
import styles from "./SigninWithGoogleButton.module.scss";
import { ReactComponent as GoogleLogo } from "../../../assets/icons/btn_google_dark_normal_ios.svg";

const GoogleButton = (props) => {
  return (
    <a
      href={props.href}
      title="Sign in with Google"
      className={styles.signinWithGoogleButton}
    >
      <GoogleLogo className={styles.googleLogo} />
      <span>Sign in with Google</span>
    </a>
  );
};

export default GoogleButton;
