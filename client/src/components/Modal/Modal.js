import React, { useRef, useEffect } from "react";
import styles from "./Modal.module.scss";

import { useModalContext } from "../../context/ModalContext/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EntryModal from "./EntryModal";
import SettingsModal from "./SettingsModal";

const MODALS = {
  ENTRY: EntryModal,
  SETTINGS: SettingsModal,
};

const Modal = () => {
  const { hideModal, modalType, modalProps } = useModalContext();
  const modalRef = useRef();

  const closeModal = (ev) => {
    if (modalRef.current === ev.target) hideModal();
  };

  useEffect(() => {
    // If null, stop useEffect - any better fixes for early return?
    if (!modalType) return;

    const bind = (ev) => {
      if (ev.key !== "Escape") return;
      if (
        document.activeElement &&
        ["INPUT", "SELECT"].includes(document.activeElement.tagName)
      )
        return;
      hideModal();
    };
    document.addEventListener("keyup", bind);
    return () => {
      document.removeEventListener("keyup", bind);
    };
  }, [modalType, hideModal]);

  // Note: cannot move this before useEffect as React does not allow early returns prior to hooks
  // https://stackoverflow.com/questions/54938236/can-you-early-return-with-react-hooks#:~:text=React%20does%20not%20allow%20you,an%20accidental%20early%20return%20statement.
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODALS[modalType];

  return (
    <div className={styles.background} onClick={closeModal} ref={modalRef}>
      <div className={styles.modalContainer}>
        <button onClick={() => hideModal()}>
          <FontAwesomeIcon icon={["fas", "times"]} className={styles.icon} />
        </button>
        <SpecificModal {...modalProps} />
      </div>
    </div>
  );
};

export default Modal;
