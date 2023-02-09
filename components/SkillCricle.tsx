import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type Props = {
  skill: {
    name: string;
    proficiency: string;
    techImgUrl: string;
  };
  directionLeft?: boolean;
};

const SkillCricle = ({ skill, directionLeft }: Props) => {
  const smallDeviceCondition = useMediaQuery(840);

  const extractXByWidth = () => {
    if (smallDeviceCondition && directionLeft) return -250;
    else if (smallDeviceCondition) return 250;
    else if (!smallDeviceCondition && directionLeft) return -100;
    else return 100;
  };

  return (
    <motion.div
      initial={{
        x: extractXByWidth(),
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      className="group relative flex cursor-pointer"
    >
      <div className="relative border border-gray-500 w-16 h-16 xl:w-32 xl:h-32 sm:w-28 sm:h-28 filter group-hover:grayscale transition duration-300 ease-in-out">
        <Image
          alt="tech img"
          src={skill.techImgUrl}
          fill
          className="object-contain p-3"
        />
      </div>
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-orange-100 w-16 h-16 xl:w-32 xl:h-32 sm:w-28 sm:h-28 z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-xl sm:text-2xl font-bold text-black opacity-100 select-none">
            {skill.proficiency}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCricle;
