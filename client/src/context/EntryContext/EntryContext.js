import React, { useEffect, useReducer, useContext, createContext } from "react";

import { useAuthContext } from "../AuthContext/AuthContext";
import { entryAPI } from "../../utils/API";
import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
} from "./entryTypes";

// useEntryContext custom hook which will be used to use this context
// rather than export EntryContext and having useContext(EntryContext) in other files
const EntryContext = createContext();
export const useEntryContext = () => useContext(EntryContext);

// Reducers (could put in /context/reducers/index.js or entryReducers.js)
const reducer = (state, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return action.payload;
    case ADD_ENTRY:
      return [...state, action.payload];
    case DELETE_ENTRY:
      return state.filter((el) => el._id !== action.payload);
    case UPDATE_ENTRY:
      return state.map((el) => {
        if (el._id !== action.payload.entryId) return el;
        return action.payload.updatedEntry;
      });
    default:
      throw new Error();
  }
};

// Initial state
const initialState = [];

export const EntryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({
        type: GET_ENTRIES,
        payload: user.entries,
      });
    }
  }, [isAuthenticated, user]);

  // // Actions (could put in /context/actions/index.js or entryActions.js ???)
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
      // Instant card add for frontend, use -ve temp id for optimistic ui if signed in
      const tempId = isAuthenticated ? -(state.length + 1) : state.length + 1;
      dispatch({
        type: ADD_ENTRY,
        payload: { ...entry, _id: tempId },
      });

      // Send to backend and update ._id
      if (isAuthenticated) {
        const res = await entryAPI.create(entry);
        dispatch({
          type: UPDATE_ENTRY,
          payload: {
            entryId: tempId,
            updatedEntry: res.data,
          },
        });
      }
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
      if (isAuthenticated) {
        await entryAPI.delete(entryId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateEntry = async (
    entryId,
    description,
    type,
    duration,
    startTime
  ) => {
    // Create entry data obj and remove description field if blank/whitespace
    const updatedEntry = {
      _id: entryId,
      description,
      type,
      duration,
      startTime,
    }; // This obj goes straight to frontend - include _.id so that delete works
    if (!updatedEntry.description.replace(/\s/g, "").length)
      delete updatedEntry.description;

    try {
      // Instant card update for frontend
      dispatch({
        type: UPDATE_ENTRY,
        payload: {
          entryId,
          updatedEntry,
        },
      });

      // Send to backend
      if (isAuthenticated) {
        await entryAPI.update(entryId, updatedEntry);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EntryContext.Provider
      value={{ state, getEntries, addEntry, deleteEntry, updateEntry }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};
