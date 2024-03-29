import React from "react";
import { authReducer } from "../reducers/AuthReducer";
import { checkPropTypes } from "prop-types";

export const AuthContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  loading: true,
  token: null,
  url: "http://localhost:5000"
};

const AuthContextProvider = props => {
  const [auth_state, auth_dispatch] = React.useReducer(
    authReducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{ auth_state, auth_dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
