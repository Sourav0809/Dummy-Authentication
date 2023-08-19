import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./components/Store/AuthContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

function App() {
  const { isLoggedIn, logIn } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  // if the user refresh the page

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    logIn(idToken);
    setLoader(false);
  }, [logIn]);

  const loaderScreen = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px",
      }}
    >
      <img
        style={{ color: "white", width: "100px", height: "100px" }}
        src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
      />
    </div>
  );

  return (
    <Layout>
      {!loader ? (
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<LoginPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<HomePage />} />
            </>
          )}
        </Routes>
      ) : (
        <div>{loaderScreen}</div>
      )}
      <ToastContainer />
    </Layout>
  );
}

export default App;
