import React from "react";
import styles from "./Footer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Made with 💝 by{" "}
        <a href="https://github.com/mtu2" title="Michael">
          Michael
        </a>{" "}
        &nbsp; |{" "}
        <a href="www.linkedin.com/in/tu-michael" title="LinkedIn">
          <FontAwesomeIcon icon={["fab", "github"]} className={styles.icon} />
        </a>{" "}
        <a href="https://github.com/mtu2" title="Github">
          <FontAwesomeIcon icon={["fab", "linkedin"]} className={styles.icon} />
        </a>
      </p>
      <p>
        Logo made by{" "}
        <a
          href="https://www.flaticon.com/authors/kiranshastry"
          title="Kiranshastry"
        >
          Kiranshastry
        </a>
        . Timer sounds made by{" "}
        <a
          href="https://freesound.org/people/FoolBoyMedia/"
          title="FoolBoyMedia"
        >
          FoolBoyMedia
        </a>
        .
      </p>
    </div>
  );
}

export default Footer;
