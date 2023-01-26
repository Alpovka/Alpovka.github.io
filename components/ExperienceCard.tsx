import useMediaQuery from "@/hooks/useMediaQuery";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ExperienceType = {
  data: {
    id: string;
    role: string;
    companyName: string;
    startDate: string;
    endDate?: string;
    stillWorking: boolean;
    points: Array<string>;
    companyLogo: string;
    type?: string;
    location: string;
  };
};

interface ExperienceCardProps {
  data: ExperienceType["data"];
}

export default function ExperienceCard({ data }: ExperienceCardProps) {
  const isBreakPoint = useMediaQuery(768);
  const [experienceCard, setExperienceCard] = useState<null | string>(null);

  const smallDeviceViewCondition = experienceCard === data.id && isBreakPoint;
  const biggerDeviceViewCondition = experienceCard === data.id && !isBreakPoint;

  const onPressButton = (feature: string) => {
    setExperienceCard((prev) => (prev === feature ? null : feature));
  };

  return (
    <motion.div
      layout="size"
      className="flex flex-row justify-center items-center w-full snap-center bg-[rgb(36,36,36)] min-h-full p-10 hover:opacity-100 opacity-40 transition-opacity duration-200 "
    >
      <motion.article
        layout="position"
        className="flex flex-col rounded-lg items-center space-y-8 min-w-[400px] min-h-[410px]"
      >
        {smallDeviceViewCondition ? (
          <motion.ul
            layout="preserve-aspect"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              type: "tween",
            }}
            className="list-disc space-y-4 mx-8 text-lg"
          >
            {data.points?.map((point, key) => (
              <li key={key}>{point}</li>
            ))}
          </motion.ul>
        ) : (
          <>
            <motion.div
              initial={{
                y: -100,
                opacity: 0,
              }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-32 h-32 xl:w-[150px] xl:h-[150px] object-center"
            >
              <Image
                src={data.companyLogo}
                className="rounded-full"
                fill
                alt="company image"
              />
            </motion.div>

            <div className="flex flex-col justify-evenly items-center px-0 md:px-10 space-y-3">
              <h4 className="text-4xl font-light text-center">{data?.role}</h4>
              <p className="flex flex-col items-center justify-evenly mx-5 space-y-1">
                <span className="font-bold text-xl text-center">
                  {data.companyName}
                </span>
                <span className="flex flex-row justify-center text-center items-center min-w-[150px] text-lg font-light">
                  <MapPinIcon className=" md:visible h-4 w-4 animate-none mr-1" />
                  {data.location} {data.type}
                </span>
              </p>
              <p className="text-lg font-extralight">
                {data?.startDate} -{" "}
                {data?.stillWorking ? "PRESENT" : data?.endDate}
              </p>
            </div>
          </>
        )}
        <motion.button
          layout="position"
          onClick={() => onPressButton(data.id)}
          className={`visible font-extralight cursor-pointer justify-center items-center uppercase border rounded-lg ${
            data.id !== "3" ? "experience1Class" : "experience2Class"
          } px-10 py-5 transition-colors ease-in`}
        >
          {experienceCard === data.id ? "hide" : "view"} details
        </motion.button>
      </motion.article>
      {biggerDeviceViewCondition ? (
        <motion.ul
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            type: "tween",
          }}
          className="list-disc space-y-4 ml-16 text-lg"
        >
          {data.points?.map((point, key) => (
            <li key={key}>{point}</li>
          ))}
        </motion.ul>
      ) : null}
    </motion.div>
  );
}
