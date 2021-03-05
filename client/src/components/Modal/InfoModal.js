import React from "react";
import styles from "./InfoModal.module.scss";
import ModalWrapper from "./ModalWrapper/ModalWrapper";

function InfoModal() {
  return (
    <ModalWrapper>
      <div className={styles.infoModal}>
        <h2>What is Pomotimer?</h2>
        <p>
          Pomotimer is a fully customisable pomodoro-based timer and work
          tracker. Create an account and sync your work across multiple devices.
        </p>
        <h2>What is the Pomodoro Technique?</h2>
        <p>
          The Pomodoro Technique is a productivity system that uses a timer to
          break down work into short, timed intervals (called "pomodoros").
          Traditionally, these pomodoros are 25 minutes in length, and separated
          by short 5 minute breaks. After four pomodoros, take a longer break of
          15-30 minutes before starting again.
        </p>
      </div>
    </ModalWrapper>
  );
}

export default InfoModal;
