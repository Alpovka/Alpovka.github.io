import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfilePicture from "../../assets/jobz/xx2.png";
import BackgroundTechs from "../../assets/jobz/landing.png";
import { motion } from "framer-motion";

type Props = {};

const Redirector = (props: Props) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (user) {
      router.push("/JobZ/Dashboard");
    }
  }, [user, router]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="fixed w-screen h-screen bg-jobzBlack flex flex-col justify-center items-center">
      <div className="absolute self-end max-sm:w-[150%] sm:max-lg:w-[90%]  lg:w-[50%] 2xl:w-[70%] h-full">
        <Image alt="background of landing page" src={BackgroundTechs} fill />
      </div>
      <Head>
        <title>Alpovka JobZ</title>
        <meta
          name="description"
          content="Personal website for collecting job offers"
        />
        <link rel="icon" type="image/png" href="../images/favicon.png" />
      </Head>
      {!user ? (
        <>
          <motion.div
            initial={{
              x: -200,
              y: -200,
              rotate: 45,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: -25,
              rotate: -8,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
            }}
            viewport={{
              once: true,
            }}
            className="absolute bottom-0 -left-72 -rotate-[10deg]"
          >
            <div className="cards w-[200px] h-[250px] -rotate-[60deg]">
              <figure className="card flex flex-col items-center justify-end">
                <Link
                  href="https://github.com/Alpovka"
                  className="w-full flex justify-end items-end mr-12 md:mr-24 rotate-45 rounded-full hover:bg-gradient-to-r from-jobzLightPurple to-jobzDarkPurple transition-colors"
                >
                  <AiFillGithub className="card_title" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/alpovka"
                  className="w-full flex justify-end items-end mr-12 md:mr-24 rotate-45 rounded-md hover:bg-gradient-to-r from-jobzLightPurple to-jobzDarkPurple transition-colors"
                >
                  <FaLinkedinIn className="card_title" />
                </Link>
                <Link
                  href="https://www.instagram.com/alperen_karavelioglu/"
                  className="w-full flex justify-end items-end rotate-45 mr-12 md:mr-24 rounded-lg hover:bg-gradient-to-r from-jobzLightPurple to-jobzDarkPurple transition-colors"
                >
                  <AiFillInstagram className="card_title" />
                </Link>
              </figure>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-5 left-5"
            initial={{
              x: 50,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
          >
            <Link
              href="/"
              className="cta flex items-center justify-center self-start scale-[75%]"
            >
              <ArrowLongLeftIcon
                id="arrow-horizontal"
                className="text-jobzWhite"
                width={24}
                height={24}
                style={{
                  marginBottom: 6,
                }}
              />
              <span className="hover-underline-animation">Go to portfolio</span>
            </Link>
          </motion.div>
          <motion.header
            initial={{
              y: 50,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="absolute top-0 right-0 uppercase text-jobzWhite leading-tight font-extralight font tracking-wider text-3xl sm:text-5xl text-justify lg:text-start md:text-5xl p-8 mt-[10vh] md:w-[60vw] lg:w-[50vw] lg:text-7xl 2xl:w-[50vw] 2xl:text-8xl 2xl:mr-16 max-[350px]:text-2xl max-sm:mt-[6vh] max-[280px]:text-xl"
          >
            My <span className="font-bold">job</span> platform for collecting{" "}
            <span className="font-bold">offers</span> from{" "}
            <span className="font-bold">you.</span>
          </motion.header>
          <motion.div
            initial={{
              y: 50,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="coolTextEntrance absolute flex flex-col justify-evenly space-y-4 items-start p-8 md:max-lg:pr-16 md:max-lg:pt-0 pl-16 pr-8 lg:pr-0 mt-36 pb-16 md:mt-0 md:top-[10vh] md:left-10 md:w-[40vw] max-[500px]:scale-90  max-[440px]:top-[5vh] max-sm:top-[5vh]"
          >
            <div className="w-full h-80 flex flex-col space-y-2 md:max-lg:items-center sm:max-md:mt-10 ">
              <Image
                alt="Profile Picture"
                src={ProfilePicture}
                width={96}
                height={96}
                priority
                className="absolute md:max-lg:relative md:max-lg:m-0 -mt-4 -ml-8 max-md:mr-10 max-md:mt-6 max-[310px]:-mt-0 max-[350px]:-mt-4"
              />
              <div>
                <h2 className="font-titillium text-jobzWhite md:max-lg:m-0 ml-20">
                  Alperen KARAVELIOGLU
                </h2>
                <h3 className="font-titillium opacity-80 text-jobzWhite md:max-lg:m-0 ml-20">
                  Software Developer
                </h3>
              </div>
              <p className="font-titillium opacity-60 text-jobzWhite ml-20 md:max-lg:m-0 md:max-lg:text-center max-[350px]:ml-0 max-[350px]:w-[110%] max-[350px]:-translate-x-6 max-[410px]:text-sm max-[355px]:text-xs">
                Developing exclusive, modern, fast and fully responsive web and
                mobile applications. With this platform, you can offer me any
                type of job. Consistent, trusty work guaranteed.
              </p>
            </div>
          </motion.div>
          <div className="absolute top-[62.5vh] px-8 md:top-[50vh] md:right-4 md:w-[35vw] xl:left-[10vw] xl:top-[45vh] xl:w-[90vh] lg:max-xl:top-[77.5vh]">
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="flex space-x-20 text-jobzWhite max-[400px]:text-xs md:flex-col md:space-y-6 max-[330px]:space-x-8 xl:flex-row lg:max-xl:flex-row"
            >
              <motion.li
                variants={item}
                className="-space-y-1 md:w-[100px] self-start lg:max-xl:translate-y-6"
              >
                <h1 className="font-bold">8H+</h1>
                <p className="font-titillium opacity-60">On pc</p>
              </motion.li>
              <motion.li
                variants={item}
                className="-space-y-1 md:w-[100px] self-center md:-translate-x-6 xl:-translate-y-6"
              >
                <h1 className="font-bold">24/7</h1>
                <p className="font-titillium opacity-60">Loves Coding</p>
              </motion.li>
              <motion.li
                variants={item}
                className="-space-y-1 md:w-[100px] self-end xl:-translate-y-6"
              >
                <h1 className="font-bold">15€ / H</h1>
                <p className="font-titillium opacity-60">Starting price</p>
              </motion.li>
            </motion.ul>
          </div>
          <motion.div
            initial={{
              x: 50,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            viewport={{
              once: true,
            }}
            className="flex flex-col justify-between w-[60%] h-80 p-8 mt-[50vh] lg:mt-[40vh] rounded-2xl z-10 "
          >
            <Link
              href={"/JobZ/Register"}
              className="flex justify-center items-center entranceButton entranceButton:hover .entranceButton:active max-sm:mt-26 md:max-lg:ml-24 xl:mt-24 xl:ml-28 max-md:scale-[70%] max-md:mt-24 lg:max-xl:-mt-10 lg:max-xl:-ml-12"
            >
              <p className="font-titillium text-jobzWhite">Offer Me A Job</p>
            </Link>
            <Link
              className="self-end max-[480px]:mb-14 md:max-lg:mb-16 max-md:scale-[70%] lg:max-xl:mb-32 lg:max-xl:mr-[45vh]"
              href={"/JobZ/Login"}
            >
              <p className=" text-jobzWhite font-titillium">Login</p>
            </Link>
          </motion.div>
        </>
      ) : null}
    </div>
  );
};

export default Redirector;
