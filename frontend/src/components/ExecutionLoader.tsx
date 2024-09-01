import React from "react";
import { motion, Variants } from "framer-motion";

const ExecutionLoader: React.FC = () => {
  const lineVariants: Variants = {
    animate: {
      width: ["30%", "70%"],
      transition: {
        duration: 0.65,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  const shortLineVariants: Variants = {
    animate: {
      width: ["70%", "30%"],
      transition: {
        duration: 0.65,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  return (
    <div className="execution-loader">
      <motion.div className="line" variants={lineVariants} animate="animate" />
      <motion.div
        className="short-line"
        variants={shortLineVariants}
        animate="animate"
      />
    </div>
  );
};

export default ExecutionLoader;
