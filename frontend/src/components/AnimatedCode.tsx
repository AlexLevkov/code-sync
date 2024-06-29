import React from "react";
import { ReactTyped } from "react-typed";

const AnimatedCode: React.FC = () => {
  const typedOptions = {
    strings: [
      `<code style="color:white">
        <span class="red">const</span> <span class="orange">sayHello</span> = () => {
        <span style="margin-left:25px">console.<span class="green">log</span>(<span class="gold">"Hello CodeSync!"</span>)</span></span>
        };</code>`,
    ],
    typeSpeed: 50,
  };

  return (
    <ReactTyped
      strings={typedOptions.strings}
      typeSpeed={typedOptions.typeSpeed}
    ></ReactTyped>
  );
};

export default AnimatedCode;
