import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Redirector = (props: Props) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (user) {
      router.push("/JobZ/Dashboard");
    }
  }, [user, router]);

  return (
    <div className="w-screen h-screen bg-jobzBlack flex flex-col justify-center items-center ">
      {!user ? (
        <>
          <Link
            href={"/"}
            className="absolute top-5 left-5 cta flex items-center justify-center self-start scale-[75%]"
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
          <h1 className="absolute top-0 right-0 uppercase text-jobzWhite leading-tight font-extralight font tracking-wider text-4xl text-justify lg:text-start md:text-5xl p-8 mt-[10vh] md:w-[60vw] lg:w-[50vw] lg:text-7xl 2xl:w-[50vw] 2xl:text-8xl 2xl:mr-16 ">
            My <span className="font-bold">job</span> platform for collecting{" "}
            <span className="font-bold">offers</span> from{" "}
            <span className="font-bold">you.</span>
          </h1>
          <div className="flex flex-col justify-between w-[60%] h-80 p-8 mt-[50vh] lg:mt-[40vh] rounded-2xl z-10">
            <button className="entranceButton entranceButton:hover .entranceButton:active">
              <Link href={"/JobZ/Register"}>
                <p className="font-titillium text-jobzWhite">Offer Me A Job</p>
              </Link>
            </button>
            <Link className="self-end" href={"/JobZ/Login"}>
              <p className=" text-jobzWhite font-titillium">Login</p>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Redirector;
