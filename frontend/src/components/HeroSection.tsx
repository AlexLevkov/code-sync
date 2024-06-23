import React from "react";
import AnimatedCode from "../components/AnimatedCode.tsx";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section-cmp">
      <div className="hero-section-cmp-title-box">
        <h2 className="main-title">Live Code Collaboration</h2>
        <h4 className="sub-title">Code, Chat and Collaborate Together</h4>
      </div>
      <div className="title-typed-box">
        <h4 className="public-title">Public Examples:</h4>
        <AnimatedCode />
      </div>
    </div>
  );
};

export default HeroSection;
