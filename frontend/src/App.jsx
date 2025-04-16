import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import TodoDashboard from "./screens/TodoDashboard";
import Settings from "./screens/Settings";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import AccountSettings from "./screens/AccountSettings";
import PasswordSettings from "./screens/PasswordSettings";
import HotelForm from "./screens/HotelForm";

const App = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<TodoDashboard />} />
          <Route path="hotelForm" element={<HotelForm />} />

          <Route path="settings" element={<Settings />} />
          <Route path="settings/account" element={<AccountSettings />} />
          <Route path="settings/password" element={<PasswordSettings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
