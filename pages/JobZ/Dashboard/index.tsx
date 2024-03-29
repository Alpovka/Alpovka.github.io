import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "@/redux/authUserSlice";
import { reset as resetOffers, getOffers } from "@/redux/offerSlice";
import OfferForm from "@/components/OfferForm";
import OfferCard from "@/components/OfferCard";
import Image from "next/image";
import tempImage from "../../../assets/jobz/userTemp.png";
import {
  ArrowLongLeftIcon,
  BuildingOffice2Icon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { ImCheckmark, ImCross, ImEye } from "react-icons/im";
import Head from "next/head";
import { motion } from "framer-motion";
import { AppDispatch } from "@/redux/store";

type Props = {};

function Dashboard({}: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
  const { user } = useSelector((state: any) => state.authUser);
  const { offers, isLoading, isError, message, isSuccess } = useSelector(
    (state: any) => state.offers
  );

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const onNewOfferButton = () => {
    setToggleForm((prev) => !prev);
  };

  const extractOffersConditionCount = () => {
    const seenOffersCount = offers?.filter(
      (offer: any) => offer.didSeen
    ).length;
    const acceptedOffersCount = offers?.filter(
      (offer: any) => offer.didAccepted
    ).length;
    const rejectedOffersCount = offers?.filter(
      (offer: any) => offer.didRejected
    ).length;
    return { seenOffersCount, acceptedOffersCount, rejectedOffersCount };
  };

  const { seenOffersCount, acceptedOffersCount, rejectedOffersCount } =
    extractOffersConditionCount();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setFirstLoadCompleted(true);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (!user) {
      router.back();
    }

    if (isError) {
      setError(message);
    }

    dispatch(getOffers());
  }, [user, router, isError, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetOffers());
    };
  }, [user, dispatch, router]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div
      id="root"
      className="bg-jobzBlack text-jobzWhite font-titillium h-screen snap-y snap-mandatory z-0 overflow-y-scroll overflow-x-hidden scrollbar-none"
    >
      {!user ? (
        <h1>User deleted or not created</h1>
      ) : (
        <>
          <Head>
            <title>Your Dashboard</title>
            <meta name="description" content="Alpovka JobZ Dashboard" />
            <link rel="icon" type="image/png" href="../images/favicon.png" />
          </Head>
          <div className="flex flex-col items-center font-titillium">
            <div className="w-full flex justify-between items-center my-[1.25rem] px-8">
              <Link
                href={"/"}
                className="cta flex items-center justify-center self-start scale-[70%]"
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
                <span className="hover-underline-animation">Back</span>
              </Link>
              <button
                className="cursor-pointer text-jobzGrey text-sm"
                onClick={onLogout}
              >
                Log Out
              </button>
            </div>
            <div className="flex flex-col w-full max-md:space-y-8 my-8 mb-16 md:flex-row md:justify-evenly md:space-x-4 md:scale-[80%] lg:scale-100 items-center">
              <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-8 md:justify-between">
                <figure className="relative max-sm:w-24 max-sm:h-24 sm:w-32 sm:h-32 rounded-full md:min-w-[128px]">
                  <Image
                    alt="User profile picture"
                    src={tempImage}
                    fill
                    priority
                  />
                </figure>
                <header className="flex flex-col items-center md:items-start">
                  <h1 className="max-sm:text-lg max-md:text-center sm:text-xl">
                    {user?.name}
                  </h1>
                  {user.organization ? (
                    <div className="flex items-center justify-between space-x-2">
                      <BuildingOffice2Icon className="w-4 md:w-5" />
                      <h2 className="max-sm:text-base sm:text-lg">
                        {user.organization}
                      </h2>
                    </div>
                  ) : null}
                </header>
              </div>
              <ul className="flex max-md:w-full justify-evenly space-x-16 items-center text-xs xl:text-sm">
                <li className="text-center">
                  <div className="flex flex-col items-center md:flex-row md:space-x-2 max-md:space-y-2">
                    <ImEye
                      size={16}
                      className="text-jobzYellow opacity-50 max-sm:visible sm:hidden"
                      data-te-toggle="tooltip"
                      title="Seen"
                    />
                    <h1 className="font-bold max-sm:hidden sm:visible">
                      Seen Offers
                    </h1>
                    <p className="font-titillium opacity-60 rounded-full border w-8 border-opacity-70 border-jobzLightPurple shadow-[inset_0_0_30px_-10px] shadow-jobzDarkPurple">
                      {seenOffersCount}
                    </p>
                  </div>
                </li>
                <li className="text-center">
                  <div className="flex flex-col items-center md:flex-row md:space-x-2 max-md:space-y-2">
                    <ImCheckmark
                      size={16}
                      className="text-jobzGreen opacity-50 max-sm:visible sm:hidden"
                      data-te-toggle="tooltip"
                      title="Accepted"
                    />
                    <h1 className="font-bold max-sm:hidden sm:visible">
                      Accepted Offers
                    </h1>
                    <p className="font-titillium opacity-60 rounded-full border w-8 border-opacity-70 border-jobzLightPurple shadow-[inset_0_0_30px_-10px] shadow-jobzDarkPurple">
                      {acceptedOffersCount}
                    </p>
                  </div>
                </li>
                <li className="text-center">
                  <div className="flex flex-col items-center md:flex-row md:space-x-2 max-md:space-y-2">
                    <ImCross
                      size={16}
                      className="text-jobzOrange opacity-50 max-sm:visible sm:hidden"
                      data-te-toggle="tooltip"
                      title="Rejected"
                    />
                    <h1 className="font-bold max-sm:hidden sm:visible">
                      Rejected Offers
                    </h1>
                    <p className="font-titillium opacity-60 rounded-full border w-8 border-opacity-70 border-jobzLightPurple shadow-[inset_0_0_30px_-10px] shadow-jobzDarkPurple">
                      {rejectedOffersCount}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <button
              className={`flex max-[390px]:scale-[80%] justify-evenly items-center border border-jobzWhite px-6 py-3 rounded-3xl self-center ${
                !toggleForm ? "hover:border-white" : "hover:border-jobzOrange"
              }  transition-colors`}
              onClick={onNewOfferButton}
            >
              {toggleForm ? (
                <XMarkIcon width={24} />
              ) : (
                <>
                  <PlusSmallIcon
                    width={24}
                    style={{
                      marginRight: 8,
                    }}
                  />{" "}
                  {" Add new offer"}
                </>
              )}
            </button>
            {toggleForm ? (
              <OfferForm
                fetchStatus={{
                  isLoading,
                  isSuccess,
                  isError,
                }}
              />
            ) : null}
            <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 FHD:grid-cols-4 4K:grid-cols-6 gap-8 items-center max-md:space-y-8 w-full p-8 mt-8">
              {!firstLoadCompleted ? (
                <div className="three-body justify-self-center col-span-full md:mt-16 md:scale-125 2xl:mt-32 2xl:scale-150">
                  <div className="three-body__dot"></div>
                  <div className="three-body__dot"></div>
                  <div className="three-body__dot"></div>
                </div>
              ) : (
                offers?.map((offer: any, index: number) => (
                  <motion.div
                    key={offer._id}
                    initial={{
                      opacity: 0,
                      translateX: index % 2 === 0 ? -50 : 50,
                      translateY: 50,
                    }}
                    whileInView={{ opacity: 1, translateX: 0, translateY: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.3) % 0.1 }}
                    viewport={{ once: true }}
                  >
                    <OfferCard
                      key={offer._id}
                      offer={offer}
                      fetchStatus={{
                        isLoading,
                        isSuccess,
                        isError,
                      }}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
