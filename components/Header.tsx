import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBriefcase } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 flex items-center py-5 pl-10 pr-12 justify-between max-w-7xl mx-auto z-30 xl:items-center overflow-hidden">
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
        className="flex flex-row items-center space-x-4 self-start"
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
      <motion.div
        className="flex flex-col max-md:flex-row items-end md:space-y-5 space-x-4"
        initial={{
          x: 300,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <Link
          href="/JobZ"
          className="cursor-pointer flex items-center space-x-3"
        >
          <TbBriefcase className="w-[28px] h-[28px] opacity-50" />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            my job platform
          </p>
        </Link>

        <Link
          href="#contact-me"
          className="cursor-pointer flex items-center space-x-3"
        >
          <MdOutlineMailOutline opacity={0.5} className="w-[28px] h-[28px]" />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get In Touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}

// THIS PIECE WILL BE REPLACED WHEN ALPOVKA JOBS PROJECTS COMPLETED

// import { motion } from "framer-motion";
// import { AiFillGithub } from "react-icons/ai";
// import { FaLinkedinIn, FaRegHandshake } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import Link from "next/link";

// type Props = {};

// export default function Header({}: Props) {
//   return (
//     <header className="sticky top-0 flex items-center py-5 px-10 justify-between max-w-7xl mx-auto z-30 xl:items-center overflow-hidden">
//       <motion.div
//         initial={{
//           x: -500,
//           opacity: 0,
//           scale: 0.5,
//         }}
//         animate={{
//           x: 0,
//           opacity: 1,
//           scale: 1,
//         }}
//         transition={{
//           duration: 1.5,
//         }}
//         className="flex flex-row items-center space-x-4 mb-12"
//       >
//         <Link href="https://github.com/Alpovka" className="cursor-pointer">
//           <AiFillGithub
//             opacity={0.5}
//             className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
//           />
//         </Link>
//         <Link
//           href="https://www.linkedin.com/in/alpovka"
//           className="cursor-pointer"
//         >
//           <FaLinkedinIn
//             opacity={0.5}
//             className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
//           />
//         </Link>
//       </motion.div>
//       <div className="flex flex-col items-end space-y-5">
//         <Link href="/Offers" className="cursor-pointer">
//           <motion.div
//             initial={{
//               x: 300,
//               opacity: 0,
//               scale: 0.5,
//             }}
//             animate={{
//               x: 0,
//               opacity: 1,
//               scale: 1,
//             }}
//             transition={{
//               duration: 1.5,
//             }}
//             className="flex flex-row items-center justify-center text-gray-300 space-x-4 cursor-pointer rounded-md "
//           >
//             <FaRegHandshake className="w-[28px] h-[28px] opacity-50" />
//             <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
//               my job platform
//             </p>
//           </motion.div>
//         </Link>
//         <Link href="#contact-me" className="cursor-pointer">
//           <motion.div
//             initial={{
//               x: 300,
//               opacity: 0,
//               scale: 0.5,
//             }}
//             animate={{
//               x: 0,
//               opacity: 1,
//               scale: 1,
//             }}
//             transition={{
//               duration: 1.5,
//             }}
//             className="flex flex-row items-center space-x-4 text-gray-300 cursor-pointer"
//           >
//             <MdOutlineMailOutline opacity={0.5} className="w-[28px] h-[28px]" />
//             <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
//               Get In Touch
//             </p>
//           </motion.div>
//         </Link>
//       </div>
//     </header>
//   );
// }
