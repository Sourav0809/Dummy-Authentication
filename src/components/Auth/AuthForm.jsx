import { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  let email = useRef();
  let passWord = useRef();

  // using the context here

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitedFormHandeler = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    const emailValue = email.current.value;
    const pwdValue = passWord.current.value;

    try {
      // if user login

      if (!isLogin) {
        const submitedResponse = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMLARLFG9Pi7D-8Pfv1fr3CWESfCQwEh8",
          { email: emailValue, password: pwdValue },
          { headers: { "Content-Type": "application/json" } }
        );
        if (submitedResponse.status == 200) {
          toast.dark("User Registered ! ");
        }
      }

      // if user sign up

      if (isLogin) {
        const loginResponse = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMLARLFG9Pi7D-8Pfv1fr3CWESfCQwEh8",
          { email: emailValue, password: pwdValue },
          { headers: { "Content-Type": "application/json" } }
        );
        if (loginResponse.status == 200) {
          toast.dark("User LoggedIn ! ");
        }
        console.log(loginResponse.data.idToken);
        // Calling the contexts log in function to set the tokenm
        authCtx.logIn(loginResponse.data.idToken);
      }
    } catch (error) {
      console.log(error);
      toast.dark(error.response.data.error.message);
    }

    setShowLoader(false);
    email.current.value = "";
    passWord.current.value = "";
  };
  const loaderScreen = (
    <div>
      <img
        style={{ color: "white", width: "100px", height: "100px" }}
        src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
      />
    </div>
  );

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitedFormHandeler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passWord} />
        </div>
        <div>
          <button type="submit" className={classes.toggle}>
            {isLogin ? "Log In " : "Sign Up"}
          </button>
        </div>

        <div>{showLoader && loaderScreen}</div>

        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
