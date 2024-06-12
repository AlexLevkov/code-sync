import React from "react";
import AnimatedCode from "../components/AnimatedCode.tsx";
import TypedText from "./TypedText.tsx";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section-cmp">
      <div className="hero-section-cmp-title-box">
        <h1 className="title-slogan">Live code collaboration</h1>
        <h2 className="sub-title-slogan">
          Code, Chat, and Collaborate Together
        </h2>
      </div>
      <div className="title-typed-box">
        <h2 className="public-title">Public Examples:</h2>
        <AnimatedCode />
      </div>
    </div>
  );
};

export default HeroSection;
