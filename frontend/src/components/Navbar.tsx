import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSync, FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Navbar: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  let animationFrameId: number;

  useEffect(() => {
    const updateRotation = () => {
      setRotation((prevRotation) => (prevRotation + 4) % 360);
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    if (isRotating) {
      animationFrameId = requestAnimationFrame(updateRotation);
    } else {
      cancelAnimationFrame(animationFrameId);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating]);

  const handleMouseEnter = () => setIsRotating(true);
  const handleMouseLeave = () => setIsRotating(false);

  return (
    <nav className="nav-bar">
      <Link
        className="logo-link"
        to="/"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>C</span>
        <FaSync
          className="circle-svg"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
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
