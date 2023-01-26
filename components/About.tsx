import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/aboutPic.png";
import Image from "next/image";

type Props = {};

export default function About({}: Props) {
  return (
    <motion.div className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-24 tracking-[10px] sm:tracking-[20px] uppercase text-gray-500 text-2xl ml-5 md:ml-20">
        About
      </h3>

      <motion.div
        className="-mb-20 md:mb-0 flex-shrink-0 w-40 md:w-[300px] lg:w-[400px] mt-[55px]"
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        viewport={{
          once: true,
        }}
      >
        <Image
          src={aboutImg}
          alt="About image"
          priority
          className="w-40 h-40 rounded-full object-contain bg-slate-300 sm:w-full sm:h-full  sm:rounded-lg"
        />
      </motion.div>
      <div className="space-y-10 px-0 md:px-10 max-h-[35vh]">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-orange-300">little</span> chit
          chat
        </h4>
        <p className="text-base">
          {
            "👋🏻 Hi folks, My name is Alperen KARAVELIOGLU. A.K.A Alpovka. I am a self-taught software developer with a degree in electrical engineering. I'm developing applications for mobile and web environments. I love to turn ideas into visuality and will be happy to help you with your ideas as well."
          }
        </p>
      </div>
    </motion.div>
  );
}
