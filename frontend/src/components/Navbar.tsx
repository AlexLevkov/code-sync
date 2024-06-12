import React from "react";
import { Link } from "react-router-dom";
import { FaSync, FaPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <Link className="logo-link" to="/">
        <span>C</span>
        <FaSync className="circle-svg" />
        <span>deSync</span>
      </Link>
      <Link className="create-link" to="/edit">
        <FaPlus className="create-svg" />
        <span>New Project</span>
      </Link>
    </nav>
  );
};

export default Navbar;
