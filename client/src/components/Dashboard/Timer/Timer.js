import React, { useState, useEffect } from "react";
import styles from "./Timer.module.scss";
import { entryAPI } from "../../../utils/API";
import { formatTime } from "../../../utils/times";

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
  function handleStartResume() {
    if (counting) clearInterval(timerId);
    setCounting(!counting);
  }
  function handleReset() {
    // Resets current timer
    setCountdown(STATES_DICT[state]);
    setCounting(false);
  }
  function handleCancelSave() {
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
      <h1>Timer</h1>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            handleStateChange("p");
          }}
          className={`${state === "p" ? styles.active : styles.inactive}`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => {
            handleStateChange("sb");
          }}
          className={`${state === "sb" ? styles.active : styles.inactive}`}
        >
          Short Break
        </button>
        <button
          onClick={() => {
            handleStateChange("lb");
          }}
          className={`${state === "lb" ? styles.active : styles.inactive}`}
        >
          Long Break
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
      <button onClick={handleStartResume}>Start/Resume</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleCancelSave}>Cancel & Save</button>
    </div>
  );
}

export default Timer;
