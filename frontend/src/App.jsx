import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import TodoCard from "./screens/TodoCard";
import Settings from "./screens/Settings";
import Notifications from "./screens/Notifications";
import ProfileCard from "./components/ProfileCard"; // Import ProfileCard component
import Navbar from "./components/Navbar";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState("todoDashboard");
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const profileCardRef = useRef(null);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const toggleProfileCard = () => {
    setIsProfileCardOpen(!isProfileCardOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        setIsProfileCardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsProfileCardOpen(isProfileCardOpen);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "todoDashboard":
        return <TodoCard />;
      case "settings":
        return <Settings />;
      case "notifications":
        return <Notifications />;
      default:
        return <TodoCard />;
    }
  };

  return (
    <div className="app-container">
      {token ? (
        <>
          <Navbar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            toggleProfileCard={toggleProfileCard}
          />
          <div className="content">{renderContent()}</div>

          {isProfileCardOpen && (
            <div className="profile-card-container" ref={profileCardRef}>
              <ProfileCard setActiveSection={setActiveSection} />
            </div>
          )}
        </>
      ) : (
        <div className="form-container">
          {showLogin ? (
            <Login toggleForm={() => setShowLogin(false)} setToken={setToken} />
          ) : (
            <Signup toggleForm={() => setShowLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
