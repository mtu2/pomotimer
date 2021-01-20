import React, { useRef, useEffect, useCallback } from "react";
import styles from "./ModalWrapper.module.scss";

import { useModalContext } from "../../../context/ModalContext/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalWrapper({ children, onClose }) {
  const { hideModal } = useModalContext();
  const modalRef = useRef();

  const handleHideModal = useCallback(() => {
    onClose();
    hideModal();
  }, [hideModal, onClose]);

  useEffect(() => {
    const bind = (ev) => {
      if (ev.key !== "Escape") return;
      if (
        document.activeElement &&
        ["INPUT", "SELECT"].includes(document.activeElement.tagName)
      )
        return;
      handleHideModal();
    };
    document.addEventListener("keyup", bind);
    return () => {
      document.removeEventListener("keyup", bind);
    };
  }, [handleHideModal]);

  const closeModal = (ev) => {
    if (modalRef.current === ev.target) handleHideModal();
  };

  return (
    <div className={styles.background} onClick={closeModal} ref={modalRef}>
      <div className={styles.modalContainer}>
        <button
          className={styles.closeModalBtn}
          onClick={() => handleHideModal()}
        >
          <FontAwesomeIcon icon={["fas", "times"]} className={styles.icon} />
        </button>
        {children}
      </div>
    </div>
  );
}

ModalWrapper.defaultProps = {
  onClose: () => undefined, //empty function
};

export default ModalWrapper;
