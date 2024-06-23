import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      Built with <FaHeart className="heart" /> by{" "}
      <a href="https://alexlevkov.com" target="_blank">
        Alex Levkov
      </a>{" "}
      | GitHub{" "}
      <a
        href="https://github.com/AlexLevkov/code-sync"
        className="portfolio"
        target="_blank"
      >
        Repository
      </a>{" "}
    </footer>
  );
};

export default Footer;
