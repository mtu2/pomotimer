import React from "react";

import { useModalContext } from "../../context/ModalContext/ModalContext";
import EntryModal from "./EntryModal";
import SettingsModal from "./SettingsModal";
import InfoModal from "./InfoModal";

const MODALS = {
  ENTRY: EntryModal,
  SETTINGS: SettingsModal,
  INFO: InfoModal,
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
