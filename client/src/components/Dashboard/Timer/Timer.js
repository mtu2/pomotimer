import React, { useState, useEffect } from "react";
import styles from "./Timer.module.scss";

import { formatSecToMinSec } from "../../../utils/times";

import { ReactComponent as TomatoIcon } from "../../../assets/icons/tomato.svg";
import { ReactComponent as CoffeeIcon } from "../../../assets/icons/coffee.svg";
import { ReactComponent as CoffeePotIcon } from "../../../assets/icons/coffee-pot.svg";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause.svg";
import { ReactComponent as StopIcon } from "../../../assets/icons/stop.svg";
import { ReactComponent as ReplayIcon } from "../../../assets/icons/replay.svg";

// BUG FIX: Bintang's answer https://stackoverflow.com/questions/39807957/countdown-timer-delays-when-tab-is-inactive

const TYPES_DICT = {
  p: 1500000,
  sb: 300000,
  lb: 900000,
};
const FULL_DASH_ARRAY = 283;

function Timer({ handleCreateEntry }) {
  const [countdown, setCountdown] = useState(1500000); // ms
  const [counting, setCounting] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const [description, setDescription] = useState("");
  const [type, setType] = useState("p");
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (countdown > 0 && counting) {
      // Fix to calculate correct time passed (fix for when tab is inactive in Chrome)
      const lastTime = new Date();

      const id = setTimeout(() => {
        // Calculate and update actual time passed
        const elapsedTime = Date.now() - lastTime;
        setCountdown(countdown - elapsedTime);
      }, 250);

      setTimerId(id);
    } else if (countdown === 0 || countdown < 0) {
      // Submit finished timer
      handleCreateEntry(description, type, TYPES_DICT[type] / 1000, startTime);

      if (type === "p") {
        // If end of pomodoro timer
        setType("sb");
        setCountdown(TYPES_DICT["sb"]);
      } else if (type === "sb" || type === "lb") {
        // If end of short/long break timer
        setType("p");
        setCountdown(TYPES_DICT["p"]);
      }
      setCounting(false);
      setStartTime(null);
    }
  }, [countdown, counting, description, type, startTime, handleCreateEntry]);

  function handleTypeChange(newType) {
    // Change type of timer if not counting
    if (type === newType || counting) return;
    setType(newType);
    setCountdown(TYPES_DICT[newType]);
  }
  function handleStartStop() {
    // If just started counting set start time
    if (countdown === TYPES_DICT[type]) {
      setStartTime(Date.now());
    }

    // Starts/stops current timer
    if (counting) clearInterval(timerId);
    setCounting(!counting);
  }
  function handleReset() {
    // Stops current timer
    if (counting) clearInterval(timerId);

    // Resets current timer
    setCountdown(TYPES_DICT[type]);
    setCounting(false);
    setStartTime(null);
  }
  function handleCancelSave() {
    // Stops current timer
    if (counting) clearInterval(timerId);

    // Resets current timer and submits entry if non-zero
    if (TYPES_DICT[type] - countdown > 0) {
      handleCreateEntry(
        description,
        type,
        Math.floor((TYPES_DICT[type] - countdown) / 1000),
        startTime
      );
    }
    setCountdown(TYPES_DICT[type]);
    setCounting(false);
    setStartTime(null);
  }
  function handleDescriptionChange(ev) {
    setDescription(ev.target.value);
  }

  function calcStrokeDasharray() {
    const timeFraction = countdown / TYPES_DICT[type];
    const adjustedTimeFraction =
      timeFraction - (1 / TYPES_DICT[type]) * (1 - timeFraction);
    return `${((1 - adjustedTimeFraction) * FULL_DASH_ARRAY).toFixed(
      0
    )} ${FULL_DASH_ARRAY}`;
  }

  return (
    <div className={styles.timer}>
      {/* Types Buttons - Pomodoro, SB, LB */}
      <div className={styles.typesButtonContainer}>
        <button
          onClick={() => handleTypeChange("p")}
          title="Pomodoro"
          className={`${type === "p" ? styles.active : styles.inactive} ${
            styles.pomodoroButton
          }`}
        >
          <TomatoIcon className={styles.icon} />
          <p>{formatSecToMinSec(TYPES_DICT["p"] / 1000)}</p>
        </button>
        <button
          onClick={() => handleTypeChange("sb")}
          title="Short Break"
          className={`${type === "sb" ? styles.active : styles.inactive} ${
            styles.shortBreakButton
          }`}
        >
          <CoffeeIcon className={styles.icon} />
          <p>{formatSecToMinSec(TYPES_DICT["sb"] / 1000)}</p>
        </button>
        <button
          onClick={() => handleTypeChange("lb")}
          title="Long Break"
          className={`${type === "lb" ? styles.active : styles.inactive} ${
            styles.longBreakButton
          }`}
        >
          <CoffeePotIcon className={styles.icon} />
          <p>{formatSecToMinSec(TYPES_DICT["lb"] / 1000)}</p>
        </button>
      </div>

      {/* Timer */}
      <div className={styles.timerContainer}>
        <h2>{formatSecToMinSec(Math.floor(countdown / 1000))}</h2>
        <p>/ {formatSecToMinSec(TYPES_DICT[type] / 1000)}</p>
        <div className={styles.innerCircle} />
        <div className={styles.outerCircle}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="50" cy="50" r="45" />
              <path
                strokeDasharray={calcStrokeDasharray()}
                d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
              ></path>
            </g>
          </svg>
        </div>
      </div>

      {/* Control Timer Buttons - Reset, Cancel & Save, Start/Stop */}
      <div className={styles.controlsButtonContainer}>
        <button onClick={handleReset} title="Reset">
          <ReplayIcon className={styles.icon} />
        </button>
        <button onClick={handleCancelSave} title="Cancel & Save">
          <StopIcon className={styles.icon} />
        </button>
        <button
          onClick={handleStartStop}
          className={styles.startStopButton}
          title="Start/Stop"
        >
          {counting ? (
            <PauseIcon className={styles.icon} />
          ) : (
            <PlayIcon className={styles.icon} />
          )}
        </button>
      </div>

      {/* Description of Entry (optional) */}
      <div className={styles.descriptionContainer}>
        <input
          type="text"
          placeholder="I'm focusing on..."
          value={description}
          onChange={handleDescriptionChange}
        ></input>
      </div>
    </div>
  );
}

export default Timer;
