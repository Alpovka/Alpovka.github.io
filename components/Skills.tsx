import React from "react";
import { motion } from "framer-motion";
import SkillCricle from "./SkillCricle";
import { SKILLS } from "@/constants";
import useDeviceDetect from "@/hooks/useDeviceDetect";

type Props = {};

function Skills({}: Props) {
  const { isMobile } = useDeviceDetect();
  return (
    <div className="flex relative h-screen flex-col text-center md:text-left max-w-[2000px] xl:px-10 min-h-screen justify-center space-y-16 mx-auto items-center">
      <div className="flex flex-col items-center scale-90">
        <h3 className="tracking-[10px] sm:tracking-[20px] uppercase text-gray-500 text-2xl pb-5">
          Skills
        </h3>

        <h3 className="uppercase tracking-[3px] text-gray-500 text-sm">
          {!isMobile ? "Hover over for" : "Press for"} proficiency
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-4 px-10 scale-90">
        {SKILLS.slice(0, SKILLS.length / 2).map((skill, key) => (
          <SkillCricle key={key} skill={skill} />
        ))}
        {SKILLS.slice(SKILLS.length / 2, SKILLS.length).map((skill, key) => (
          <SkillCricle key={key} skill={skill} directionLeft />
        ))}
      </div>
    </div>
  );
}

export default Skills;
