import { useEffect, useContext } from "react";
import AuthContext from "../components/Store/AuthContext";

const LoginPage = () => {
  const { timer, timerId } = useContext(AuthContext);

  useEffect(() => {
    console.log("timer tiggered");
    timer();
    return () => {
      console.log("previous timer cleared");
      clearTimeout(timerId);
    };
  }, []);

  return (
    <h1 style={{ padding: "20px", textAlign: "center", fontSize: "33px" }}>
      WELLCOME TO LOGIN PAGE
    </h1>
  );
};

export default LoginPage;
