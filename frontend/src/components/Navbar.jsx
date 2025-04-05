import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ toggleProfileCard }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-semibold"
                : "text-white hover:text-indigo-300"
            }
          >
            Todo Dashboard
          </NavLink>
        </li>
      </ul>
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 font-semibold"
                : "text-white hover:text-indigo-300"
            }
          >
            Notifications
          </NavLink>
        </li>
        <li
          onClick={() => toggleProfileCard(true)} // Open profile card
          className="cursor-pointer hover:text-indigo-300"
        >
          Profile
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
