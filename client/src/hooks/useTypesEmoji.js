import { useState, useEffect } from "react";
import { useSettingsContext } from "../context/SettingsContext/SettingsContext";

const initialValue = {
  p: "🍅",
  sb: "☕",
  lb: "🍺",
};

export function useTypesEmoji() {
  const [typesEmoji, setTypesEmoji] = useState(initialValue);
  const { state } = useSettingsContext();

  useEffect(() => {
    setTypesEmoji({
      p: state.pomodoroEmoji,
      sb: state.shortBreakEmoji,
      lb: state.longBreakEmoji,
    });
  }, [state]);

  return typesEmoji;
}
