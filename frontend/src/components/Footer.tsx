import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      Built with <FaHeart /> by{" "}
      <a href="https://alexlevkov.com" target="_blank">
        Alex Levkov
      </a>
    </footer>
  );
};

export default Footer;
