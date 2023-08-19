/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const userIsLoggedIn = !!token;

  const logInHandeler = (newToken) => {
    setToken(newToken);
  };

  const logOutHandeler = () => {
    setToken(null);
  };

  const timer = () => {
    let idTimer = setTimeout(() => {
      logOutHandeler();
      localStorage.removeItem("idToken");
    }, 300000);
    setTimerId(idTimer);
    console.log(idTimer, "timer set");
  };

  const AuthContextValues = {
    idToken: token,
    isLoggedIn: userIsLoggedIn,
    logIn: logInHandeler,
    logOut: logOutHandeler,
    timer: timer,
    timerId: timerId,
  };

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
