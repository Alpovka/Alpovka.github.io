import { SKILLS } from "@/constants";
import { motion } from "framer-motion";
import React from "react";
import { RxCross1 } from "react-icons/rx";

interface ProjectProps {
  project: {
    name: string;
    techs: Array<string>;
    description?: string;
    imageUrl?: string;
    router: string;
    id: string;
  };
}

function Project({ project }: ProjectProps) {
  const usedTechs = SKILLS.filter((skill) =>
    project.techs.includes(skill.name)
  );

  const blockCondition = project.name === "MessengerMermaids";

  return (
    <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-6 md:space-y-10 items-center justify-center h-screen mt-12 px-4">
      {project.imageUrl ? (
        <motion.img
          initial={{
            y: -300,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          src={project.imageUrl}
          alt="Project Img"
          className="w-[250px] md:w-[300px] -mb-4"
        />
      ) : null}

      <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
        {project.name}
      </h4>
      <div className="flex items-center space-x-4">
        {usedTechs?.map((tech, key) => (
          <motion.div
            key={key}
            className="flex items w-6 h-6 xl:w-12 xl:h-12 sm:w-8 sm:h-8 "
          >
            <img src={tech.techImgUrl} className="object-contain " />
          </motion.div>
        ))}
      </div>
      <p className="text-lg text-center  xl:w-[50%] ">{project?.description}</p>
      {project?.id !== "5" ? (
        <motion.a
          href={project.router}
          className={`font-extralight cursor-pointer justify-center items-center uppercase border ${
            blockCondition &&
            "border-red-400 text-red-400 flex justify-evenly pointer-events-none"
          }  rounded-lg px-10 py-5`}
        >
          {blockCondition && <RxCross1 className="mr-3" />}
          {blockCondition ? "Ongoing Project" : "SEE PROJECT "}
        </motion.a>
      ) : null}
    </div>
  );
}

export default Project;
