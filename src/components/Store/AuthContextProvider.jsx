/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;

  const logInHandeler = (newToken) => {
    setToken(newToken);
  };

  const logOutHandeler = () => {
    setToken(null);
  };

  const AuthContextValues = {
    idToken: token,
    isLoggedIn: userIsLoggedIn,
    logIn: logInHandeler,
    logOut: logOutHandeler,
  };

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
