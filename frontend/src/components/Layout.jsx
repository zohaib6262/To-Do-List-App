import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const profileCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile card if click is outside of the profile card container
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
  }, [isProfileCardOpen]);

  const toggleProfileCard = () => {
    setIsProfileCardOpen((prev) => !prev);
  };

  return (
    <div className="app-container relative">
      <Navbar toggleProfileCard={toggleProfileCard} />

      {isProfileCardOpen && (
        <div
          ref={profileCardRef}
          className="absolute top-16 right-4 z-50 bg-white p-6 rounded-lg shadow-md w-70"
        >
          <ProfileCard />
        </div>
      )}

      {/* Main Content */}
      <div className="content mt-16">
        {" "}
        {/* Add margin to avoid overlap with the navbar */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
