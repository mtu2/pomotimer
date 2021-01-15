import React from "react";
import ModalWrapper from "./ModalWrapper/ModalWrapper";

function SettingsModal() {
  function handleOnClose() {
    console.log("SETTINGS MODAL CLOSED");
  }

  return (
    <ModalWrapper onClose={handleOnClose}>
      <div>SETTINGS MODAL</div>
    </ModalWrapper>
  );
}

export default SettingsModal;
