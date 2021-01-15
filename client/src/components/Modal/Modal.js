import React from "react";

import { useModalContext } from "../../context/ModalContext/ModalContext";
import EntryModal from "./EntryModal";
import SettingsModal from "./SettingsModal";
import LoginModal from "./LoginModal";

const MODALS = {
  ENTRY: EntryModal,
  SETTINGS: SettingsModal,
  LOGIN: LoginModal,
};

function Modal() {
  const { modalType, modalProps } = useModalContext();
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODALS[modalType];
  return <SpecificModal {...modalProps} />;
}

export default Modal;
