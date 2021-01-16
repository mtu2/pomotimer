import React, { useEffect, useReducer, useContext, createContext } from "react";
import { authAPI } from "../../utils/API";
import { GET_USER } from "./authTypes";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const reducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    default:
      throw new Error();
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: {},
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user } = state;

  useEffect(() => {
    console.log("AuthContextProvider: getUser");
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await authAPI.getUser();
      dispatch({
        type: GET_USER,
        payload: { isAuthenticated: Boolean(res.data), user: res.data },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
