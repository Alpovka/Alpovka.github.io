import Image from "next/image";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundAnimation from "./BackgroundAnimation";
import profileImg from "../assets/pp.png";
import Link from "next/link";

type Props = {};

export default function Alpovka({}: Props) {
  const [text, count] = useTypewriter({
    words: [
      "Hi, my name is Alperen",
      "Self-Taught Programmer",
      "Coffee-Lover-Coder",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <div className="mt-[100px]">
        <BackgroundAnimation />
        <Image
          src={profileImg}
          alt="Alpovka profile pic"
          width={128}
          height={128}
          priority
          className="mt-10"
        />
      </div>
      <div className="z-30">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          Software Engineer
        </h2>
        <h1 className="text-4xl md:text-5xl xl:text-5xl lg:text-6xl font-semibold px-10">
          <span>{text}</span>
          <Cursor cursorColor="orange" />
        </h1>
        <div className="pt-5">
          <Link href="#about">
            <button className="navButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="navButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="navButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="navButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
