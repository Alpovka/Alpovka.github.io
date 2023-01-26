import React from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 flex items-center py-5 px-10 justify-between max-w-7xl mx-auto z-30 xl:items-center overflow-hidden">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center space-x-4"
      >
        <Link href="https://github.com/Alpovka" className="cursor-pointer">
          <AiFillGithub
            opacity={0.5}
            className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/alpovka"
          className="cursor-pointer"
        >
          <FaLinkedinIn
            opacity={0.5}
            className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
          />
        </Link>
      </motion.div>
      <Link href="#contact-me" className="cursor-pointer">
        <motion.div
          initial={{
            x: 300,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center space-x-4 text-gray-300 cursor-pointer"
        >
          <MdOutlineMailOutline opacity={0.5} className="w-[28px] h-[28px]" />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get In Touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}
