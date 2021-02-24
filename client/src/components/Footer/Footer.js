import React from "react";
import styles from "./Footer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Made with 💝 by{" "}
        <a href="https://mttu.dev" title="https://mttu.dev">
          Michael
        </a>{" "}
        &nbsp; |{" "}
        <a href="https://github.com/mtu2/pomotimer" title="GitHub">
          <FontAwesomeIcon icon={["fab", "github"]} className={styles.icon} />
        </a>{" "}
        <a href="https://www.linkedin.com/in/tu-michael" title="Linkedin">
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
      </p>
    </div>
  );
}

export default Footer;
