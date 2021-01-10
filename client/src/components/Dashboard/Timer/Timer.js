import React, { useState, useEffect } from "react";
import styles from "./Timer.module.scss";

import { entryAPI } from "../../../utils/API";
import { formatTime } from "../../../utils/times";

import { ReactComponent as TomatoIcon } from "../../../assets/icons/tomato.svg";
import { ReactComponent as CoffeeIcon } from "../../../assets/icons/coffee.svg";
import { ReactComponent as CoffeePotIcon } from "../../../assets/icons/coffee-pot.svg";
import { ReactComponent as PlayIcon } from "../../../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/icons/pause.svg";
import { ReactComponent as StopIcon } from "../../../assets/icons/stop.svg";
import { ReactComponent as ReplayIcon } from "../../../assets/icons/replay.svg";

const STATES_DICT = {
  p: 1500,
  sb: 300,
  lb: 900,
};
const FULL_DASH_ARRAY = 283;

function Timer() {
  const [countdown, setCountdown] = useState(1500);
  const [counting, setCounting] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [state, setState] = useState("p");

  useEffect(() => {
    if (countdown > 0 && counting) {
      const id = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      setTimerId(id);
    } else if (countdown === 0) {
      if (state === "p") {
        // If end of pomodoro timer
        submitEntry(STATES_DICT["p"]);
        setState("sb");
        setCountdown(STATES_DICT["sb"]);
      } else if (state === "sb" || state === "lb") {
        // If end of short/long break timer
        setState("p");
        setCountdown(STATES_DICT["p"]);
      }
      setCounting(false);
    }
  }, [countdown, counting, state]);

  function handleStateChange(newState) {
    if (state === newState || counting) return;
    setState(newState);
    setCountdown(STATES_DICT[newState]);
  }
  function handleStartStop() {
    if (counting) clearInterval(timerId);
    setCounting(!counting);
  }
  function handleReset() {
    // Stops current timer
    if (counting) clearInterval(timerId);

    // Resets current timer
    setCountdown(STATES_DICT[state]);
    setCounting(false);
  }
  function handleCancelSave() {
    // Stops current timer
    if (counting) clearInterval(timerId);

    // Finishes current pomodoro and submits entry
    if (state !== "p") return;
    submitEntry(STATES_DICT[state] - countdown);
    setCountdown(STATES_DICT[state]);
    setCounting(false);
  }
  async function submitEntry(duration, description) {
    const entryData = {
      duration,
      description,
    };
    await entryAPI.create(entryData);
  }
  function calcStrokeDasharray() {
    const timeFraction = countdown / STATES_DICT[state];
    const adjustedTimeFraction =
      timeFraction - (1 / STATES_DICT[state]) * (1 - timeFraction);
    return `${((1 - adjustedTimeFraction) * FULL_DASH_ARRAY).toFixed(
      0
    )} ${FULL_DASH_ARRAY}`;
  }

  return (
    <div className={styles.timer}>
      <div className={styles.statesButtonContainer}>
        <button
          onClick={() => handleStateChange("p")}
          title="Pomodoro"
          className={`${state === "p" ? styles.active : styles.inactive} ${
            styles.pomodoroButton
          }`}
        >
          <TomatoIcon className={styles.icon} />
          <p>{formatTime(STATES_DICT["p"])}</p>
        </button>
        <button
          onClick={() => handleStateChange("sb")}
          title="Short Break"
          className={`${state === "sb" ? styles.active : styles.inactive} ${
            styles.shortBreakButton
          }`}
        >
          <CoffeeIcon className={styles.icon} />
          <p>{formatTime(STATES_DICT["sb"])}</p>
        </button>
        <button
          onClick={() => handleStateChange("lb")}
          title="Long Break"
          className={`${state === "lb" ? styles.active : styles.inactive} ${
            styles.longBreakButton
          }`}
        >
          <CoffeePotIcon className={styles.icon} />
          <p>{formatTime(STATES_DICT["lb"])}</p>
        </button>
      </div>
      <div className={styles.timerContainer}>
        <h2>{formatTime(countdown)}</h2>
        <p>/ {formatTime(STATES_DICT[state])}</p>
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
    </div>
  );
}

export default Timer;
