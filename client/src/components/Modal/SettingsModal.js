import React, { useState } from "react";
import styles from "./SettingsModal.module.scss";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import OutsideClickHandler from "react-outside-click-handler";

import ModalWrapper from "./ModalWrapper/ModalWrapper";
import { useSettingsContext } from "../../context/SettingsContext/SettingsContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useFormInput } from "../../hooks/useFormInput";
import { useFormCheckbox } from "../../hooks/useFormCheckbox";

const MS_IN_MIN = 60000;

function SettingsModal() {
  const { state, updateSettings } = useSettingsContext();
  const isPageNarrow = useMediaQuery("(max-width: 400px)");
  const isPageShort = useMediaQuery("(max-height: 800px)");

  // can also just use one object (i.e. the state object)
  // https://reactjs.org/docs/forms.html - handling multiple inputs
  const pomodoroTime = useFormInput(state.pomodoroTime / MS_IN_MIN);
  const shortBreakTime = useFormInput(state.shortBreakTime / MS_IN_MIN);
  const longBreakTime = useFormInput(state.longBreakTime / MS_IN_MIN);
  const isMuted = useFormCheckbox(state.isMuted);
  const showCountdown = useFormCheckbox(state.showCountdown);
  const showOnlyPomodoros = useFormCheckbox(state.showOnlyPomodoros);
  const [pomodoroEmoji, setPomodoroEmoji] = useState(state.pomodoroEmoji);
  const [shortBreakEmoji, setShortBreakEmoji] = useState(state.shortBreakEmoji);
  const [longBreakEmoji, setLongBreakEmoji] = useState(state.longBreakEmoji);

  const [emojiPickerState, setEmojiPickerState] = useState({
    show: false,
    type: null,
  });

  function handleOpenEmojiPicker(type) {
    setEmojiPickerState({ show: true, type });
  }

  function handleCloseEmojiPicker() {
    setEmojiPickerState({ show: false, type: null });
  }

  function handleEmojiSelect(emoji) {
    switch (emojiPickerState.type) {
      case "p":
        setPomodoroEmoji(emoji.native);
        break;
      case "sb":
        setShortBreakEmoji(emoji.native);
        break;
      case "lb":
        setLongBreakEmoji(emoji.native);
        break;
      default:
        throw new Error();
    }
  }

  function handleOnClose() {
    updateSettings({
      pomodoroTime: pomodoroTime.value * MS_IN_MIN,
      shortBreakTime: shortBreakTime.value * MS_IN_MIN,
      longBreakTime: longBreakTime.value * MS_IN_MIN,
      isMuted: isMuted.checked,
      showCountdown: showCountdown.checked,
      showOnlyPomodoros: showOnlyPomodoros.checked,
      pomodoroEmoji: pomodoroEmoji,
      shortBreakEmoji: shortBreakEmoji,
      longBreakEmoji: longBreakEmoji,
    });
  }

  return (
    <ModalWrapper onClose={handleOnClose}>
      <form className={styles.settingsModal}>
        <h2>Settings</h2>
        <div className={styles.timeInputContainer}>
          <p>Time (minutes)</p>
          <div className={styles.timeLabels}>
            <label className={styles.timeLabel}>
              <span>Pomodoro</span>
              <input type="number" {...pomodoroTime}></input>
            </label>
            <label className={styles.timeLabel}>
              <span>Short Break</span>
              <input type="number" {...shortBreakTime}></input>
            </label>
            <label className={styles.timeLabel}>
              <span>Long Break</span>
              <input type="number" {...longBreakTime}></input>
            </label>
          </div>
        </div>

        <div className={styles.emojiInputContainer}>
          <p>Emojis</p>
          <div className={styles.emojiLabels}>
            <label className={styles.emojiLabel}>
              <span>Pomodoro</span>
              <p onClick={() => handleOpenEmojiPicker("p")}>{pomodoroEmoji}</p>
            </label>
            <label className={styles.emojiLabel}>
              <span>Short Break</span>
              <p onClick={() => handleOpenEmojiPicker("sb")}>
                {shortBreakEmoji}
              </p>
            </label>
            <label className={styles.emojiLabel}>
              <span>Long Break</span>
              <p onClick={() => handleOpenEmojiPicker("lb")}>
                {longBreakEmoji}
              </p>
            </label>
          </div>
          {emojiPickerState.show && (
            <OutsideClickHandler onOutsideClick={handleCloseEmojiPicker}>
              <div className={styles.emojiMart}>
                <Picker
                  title="Pick your emoji…"
                  onSelect={handleEmojiSelect}
                  style={{
                    position: "absolute",
                    top: "100%",
                    height: isPageShort ? "280px" : "356px",
                    overflow: "hidden",
                  }}
                  perLine={isPageNarrow ? 8 : 9}
                />
              </div>
            </OutsideClickHandler>
          )}
        </div>

        <label className={styles.checkbox}>
          Mute
          <input type="checkbox" {...isMuted}></input>
        </label>
        <label className={styles.checkbox}>
          Show countdown in the site title
          <input type="checkbox" {...showCountdown}></input>
        </label>
        <label className={styles.checkbox}>
          Show only pomodoros in log
          <input type="checkbox" {...showOnlyPomodoros}></input>
        </label>
      </form>
    </ModalWrapper>
  );
}

export default SettingsModal;
