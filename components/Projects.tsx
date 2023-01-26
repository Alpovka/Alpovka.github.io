import { motion } from "framer-motion";
import { PROJECTS } from "@/constants";
import React from "react";
import Project from "./Project";

type Props = {};

const Projects = (props: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="flex h-screen relative overflow-hidden flex-col text-left max-w-full mx-auto items-center "
    >
      <h3 className="uppercase tracking-[10px] sm:tracking-[20px] text-gray-500 mt-14 text-2xl">
        Projects
      </h3>
      <div className="absolute flex w-full h-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-30 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-orange-300/80">
        {PROJECTS.map((project, key) => (
          <Project key={key} project={project} />
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[rgb(255,187,0)] left-0 h-[500px] opacity-10 -skew-y-12"></div>
    </motion.div>
  );
};

export default Projects;
