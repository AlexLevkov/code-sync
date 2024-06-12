import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedText = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        `<code style="color:white">
        <span class="red">const</span> <span class="orange">sayHello</span> = () => {
          console.<span class="green">log</span>("Hello CodeSync!")</span>
        };</code>`,
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 2000,
      // loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <div className="typed-code" ref={typedElement}></div>;
};

export default TypedText;
