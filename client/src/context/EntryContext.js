import React, { useEffect, useReducer, createContext } from "react";
import { entryAPI } from "../utils/API";
import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY } from "./types";

export const EntryContext = createContext();

// Reducers (could put in /context/reducers/index.js or entryReducers.js)
const reducer = (state, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return action.payload;
    case ADD_ENTRY:
      return [...state, action.payload];
    case DELETE_ENTRY:
      return state.filter((el) => el._id !== action.payload);
    default:
      throw new Error();
  }
};

// Initial state
const initialState = [];

export const EntryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getEntries();
  }, []);

  // Actions (could put in /context/actions/index.js or entryActions.js ???)
  const getEntries = async () => {
    try {
      const res = await entryAPI.getAll();
      dispatch({
        type: GET_ENTRIES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addEntry = async (description, type, duration, startTime) => {
    // Create entry data obj and remove description field if blank/whitespace
    const entry = {
      description,
      type,
      duration,
      startTime,
    };
    if (!entry.description.replace(/\s/g, "").length) delete entry.description;

    try {
      // Instant card add for frontend
      dispatch({
        type: ADD_ENTRY,
        payload: entry,
      });

      // Send to backend and update any changes (e.g. entry ._id)
      await entryAPI.create(entry);
      getEntries();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      // Instant card delete for frontend
      dispatch({
        type: DELETE_ENTRY,
        payload: entryId,
      });

      // Send to backend
      await entryAPI.delete(entryId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EntryContext.Provider value={{ state, addEntry, deleteEntry }}>
      {props.children}
    </EntryContext.Provider>
  );
};
