import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./components/Store/AuthContext";
import { useContext } from "react";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
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
      <ToastContainer />
    </Layout>
  );
}

export default App;
