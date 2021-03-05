import { useState, useEffect } from "react";
import { useSettingsContext } from "../context/SettingsContext/SettingsContext";

const initialValue = {
  p: 1500000,
  sb: 300000,
  lb: 900000,
};

export function useTypesDuration() {
  const [typesDuration, setTypesDuration] = useState(initialValue);
  const { state } = useSettingsContext();

  useEffect(() => {
    setTypesDuration({
      p: state.pomodoroTime,
      sb: state.shortBreakTime,
      lb: state.longBreakTime,
    });
  }, [state]);

  return typesDuration;
}
