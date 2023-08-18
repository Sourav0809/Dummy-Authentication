import React from "react";
const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
