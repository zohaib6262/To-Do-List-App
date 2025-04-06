import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/allTodos.png"; // Placeholder image
import AuthContext from "../contexts/AuthContext";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState("");
  useEffect(() => {
    setUsername(localStorage?.getItem("userName") || "");
    setUserProfile(localStorage?.getItem("userProfile") || "");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("fullName");
    setToken("");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center ">
      {userProfile ? (
        <img
          src={userProfile}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-pink-500 mb-4"
        />
      ) : (
        <img
          src={profileImage}
          alt="Default Profile"
          className="w-20 h-20 rounded-full border-2 border-pink-500 mb-4"
        />
      )}

      <h3 className="text-lg font-semibold mb-4">{username}</h3>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/settings")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
