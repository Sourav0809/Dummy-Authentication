import React from "react";
const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  timer: () => {},
  timerId: null,
});

export default AuthContext;
