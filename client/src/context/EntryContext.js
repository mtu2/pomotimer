import React, { useEffect, useReducer, createContext } from "react";
import entryAPI from "../utils/API";

export const EntryContext = createContext();

// Actions (could put in /context/actions/index.js or entryActions.js)
export const getEntries = async (entries) => {
  try {
    const res = await entryAPI.getAll();
    return {
      type: "GET_ENTRIES",
      payload: res.data,
    };
  } catch (err) {
    console.log(err);
  }
};

export const addEntry = async (entry) => {
  if (!entry.description.replace(/\s/g, "").length) delete entry.description;

  try {
    await entryAPI.create(entry);
    return {
      type: "ADD_ENTRY",
      payload: entry,
    };
  } catch (err) {
    console.log(err);
  }
};

// Reducers (could put in /context/reducers/index.js or entryReducers.js)
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ENTRIES":
      return action.payload;
    case "ADD_ENTRY":
      return [...state, action.payload];
    default:
      throw new Error();
  }
};

const initialState = [];

export const EntryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(getEntries);
  }, []);

  return (
    <EntryContext.Provider value={[state, dispatch]}>
      {props.children}
    </EntryContext.Provider>
  );
};

async function handleCreateEntry(description, type, duration, startTime) {
  // Create entry data obj and remove description field if blank/whitespace
  const entryData = {
    description,
    type,
    duration,
    startTime,
  };
  if (!entryData.description.replace(/\s/g, "").length)
    delete entryData.description;

  // Instant card add for frontend
  setEntries((prevEntries) => [...prevEntries, entryData]);

  // Send to backend and update any changes (e.g. entry ._id)
  await entryAPI.create(entryData);
  // TODO: same code as fetchEntries - make into one function
  try {
    const res = await entryAPI.getAll();
    setEntries(res.data);
    console.log("get got entries from database");
  } catch (err) {
    console.log(err);
  }
}

async function handleDeleteEntry(entryId) {
  // Instant card delete for frontend
  setEntries((prevEntries) => prevEntries.filter((el) => el._id !== entryId));

  // Send to backend
  await entryAPI.delete(entryId);
}
