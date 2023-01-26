import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { EXPERIENCES } from "../constants";

type Props = {};

const Experience = (props: Props) => {
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
      className="h-screen flex relative overflow-hidden flex-col text-left max-w-full mx-auto items-center"
    >
      <h3 className="text-xl tracking-[10px] uppercase text-gray-500 sm:tracking-[20px] md:text-2xl mt-16 py-5">
        Experience
      </h3>

      <div className="w-full flex flex-col items-center overflow-x-scroll snap-y snap-mandatory scrollbar-none">
        {EXPERIENCES.map((exp, key) => (
          <ExperienceCard data={exp} key={key} />
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
