import React from "react";
import { Link } from "react-router-dom";
import { FaSync, FaPlus } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1 className="main-title">404 - Page Not Found</h1>
      <h4 className="sub-title">
        Sorry, the page you are looking for does not exist.
      </h4>
      <h4 className="sub-title">
        <Link to="/">
          Go back to the homepage <FaSync />
        </Link>
      </h4>
    </div>
  );
};

export default NotFoundPage;
