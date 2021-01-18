import React, { useEffect, useReducer, useContext, createContext } from "react";
import { toast } from "react-hot-toast";
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
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await authAPI.getUser();
      dispatch({
        type: GET_USER,
        payload: { isAuthenticated: Boolean(res.data), user: res.data },
      });

      // If authenticated and account created in last 10 seconds
      if (
        Boolean(res.data) &&
        Date.now() - new Date(res.data.createdAt) < 10000
      ) {
        toast.success("Account created!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
