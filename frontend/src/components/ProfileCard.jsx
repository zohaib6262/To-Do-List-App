import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/allTodos.png"; // Placeholder image
import AuthContext from "../contexts/AuthContext";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center ">
      <img
        src={profileImage}
        alt="Profile"
        className="w-20 h-20 rounded-full border-2 border-pink-500 mb-4"
      />
      <h3 className="text-lg font-semibold mb-4">John Doe</h3>
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
