import classes from "./ProfileForm.module.css";
import axios from "axios";
import { useRef } from "react";
import AuthContext from "../Store/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const { idToken } = useContext(AuthContext);
  const pwdRef = useRef();

  // when user type password and submit the form

  const submitedFormHandler = async (e) => {
    e.preventDefault();
    const newPwdObj = {
      idToken: idToken,
      password: pwdRef.current.value,
      returnSecureToken: true,
    };
    try {
      const submitedRes = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCMLARLFG9Pi7D-8Pfv1fr3CWESfCQwEh8",
        newPwdObj
      );
      if (submitedRes.status == 200) {
        toast.warn("Password Changed !");
      }
      console.log(submitedRes);
    } catch (error) {
      toast.dark(error.response.data.error.message);
    }
  };

  return (
    <form onSubmit={submitedFormHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={pwdRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
