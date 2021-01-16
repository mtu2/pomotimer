import React, { createContext, useContext, useReducer } from "react";
import { HIDE, SHOW } from "./modalTypes";

// useModalContext custom hook which will be used to use this context
// rather than export ModalContext and having useContext(ModalContext) in other files
const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

const reducer = (state, action) => {
  switch (action.type) {
    case HIDE:
      return {
        modalType: null,
        modalProps: {},
      };
    case SHOW:
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    default:
      throw new Error();
  }
};

const initialState = {
  modalType: null,
  modalProps: {},
};

export const ModalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { modalType, modalProps } = state;

  const showModal = (showModalType, showModalProps) => {
    dispatch({
      type: SHOW,
      payload: { modalType: showModalType, modalProps: showModalProps },
    });
  };

  const hideModal = () => {
    dispatch({
      type: HIDE,
    });
  };

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, modalType, modalProps }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
