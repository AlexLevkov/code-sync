import React from "react";
import { Link } from "react-router-dom";
import { FaSync, FaPlus } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <Link className="logo-link" to="/">
        <span>C</span>
        <FaSync className="circle-svg" />
        <span>deSync</span>
      </Link>
      <Link className="create-link" to="/edit">
        <Button className="new-project-btn" variant="">
          <FaPlus />
          <span>New Project</span>
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
