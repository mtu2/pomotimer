import React, { useEffect, useReducer, useContext, createContext } from "react";

import { useAuthContext } from "../AuthContext/AuthContext";
import { settingsAPI } from "../../utils/API";
import { GET_SETTINGS, UPDATE_SETTINGS } from "./settingsTypes";

// useSettingsContext custom hook which will be used to use this context
// rather than export SettingsContext and having useContext(SettingsContext) in other files
const SettingsContext = createContext();
export const useSettingsContext = () => useContext(SettingsContext);

// Reducers (could put in /context/reducers/index.js or entryReducers.js)
const reducer = (state, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return action.payload;
    case UPDATE_SETTINGS:
      return action.payload;
    default:
      throw new Error();
  }
};

// Initial state
const initialState = {
  pomodoroTime: 1500000,
  shortBreakTime: 300000,
  longBreakTime: 900000,
  isMuted: false,
  showCountdown: true,
  showOnlyPomodoros: false,
  pomodoroEmoji: "🍅",
  shortBreakEmoji: "☕",
  longBreakEmoji: "🍺",
};

export const SettingsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({
        type: GET_SETTINGS,
        payload: user.settings,
      });
    }
  }, [isAuthenticated, user]);

  // Actions (could put in /context/actions/index.js or settingsActions.js ???)
  const getSettings = async () => {
    try {
      const res = await settingsAPI.get();
      dispatch({
        type: GET_SETTINGS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateSettings = async (updatedSettings) => {
    try {
      // Instant settings update for frontend
      dispatch({
        type: UPDATE_SETTINGS,
        payload: updatedSettings,
      });

      // Send to backend
      if (isAuthenticated) {
        await settingsAPI.update(updatedSettings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SettingsContext.Provider value={{ state, getSettings, updateSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
