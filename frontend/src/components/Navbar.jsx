const Navbar = ({ setActiveSection, activeSection, toggleProfileCard }) => {
  return (
    <nav className="navbar">
      <ul className="left-nav">
        <li
          className={activeSection === "todoDashboard" ? "active" : ""}
          onClick={() => setActiveSection("todoDashboard")}
        >
          Todo Dashboard
        </li>
      </ul>
      <ul className="right-nav">
        <li
          className={activeSection === "notifications" ? "active" : ""}
          onClick={() => setActiveSection("notifications")}
        >
          Notifications
        </li>
        <li onClick={toggleProfileCard} className="profile-button">
          Profile
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
