import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import profileImage from "../assets/allTodos.png";

const ProfileCard = ({ setActiveSection }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(""); // Reset the token state
  };
  return (
    <div className="profile-card">
      <div style={{ position: "relative" }}>
        <img
          src={profileImage}
          alt="Profile"
          className="profile-img"
          style={{
            borderRadius: "50%",
            border: "2px solid pink",
            width: "80px",
            height: "80px",
          }}
        />
        <button
          className="edit-profile-btn"
          onClick={() => alert("Edit Profile Clicked")}
          style={{
            position: "absolute",
            top: "49px",
            fontSize: "15px",
            right: "-5px",
            borderRadius: "50%",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faEdit} style={{ color: "black" }} />{" "}
          {/* Set icon color to black */}
        </button>
      </div>
      <h3 className="username">John Doe</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <button
          className="btn-settings"
          onClick={() => setActiveSection("settings")}
        >
          Settings
        </button>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
