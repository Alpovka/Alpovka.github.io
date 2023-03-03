import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "@/redux/authUserSlice";
import { reset as resetOffers, getOffers } from "@/redux/offerSlice";
import OfferForm from "@/components/OfferForm";
import OfferCard from "@/components/OfferCard";
import Image from "next/image";
import tempImage from "../../../assets/jobz/xx2.png";
import {
  ArrowLongLeftIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {};

function Dashboard({}: Props) {
  const [toggleForm, setToggleForm] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authUser);
  const { offers, isLoading, isError, message } = useSelector(
    (state) => state.offers
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
    if (!user) {
      router.back();
    }

    if (isError) {
      setError(message);
    }

    dispatch(getOffers());

    return () => {
      dispatch(resetOffers());
    };
  }, [user, router, isError, message, dispatch]);

  return (
    <div
      id="root"
      className="bg-jobzBlack text-jobzWhite font-titillium h-screen snap-y snap-mandatory z-0 overflow-y-scroll overflow-x-hidden scrollbar-none"
    >
      {!user ? (
        <h1>User deleted or not created</h1>
      ) : (
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
          <div className="flex flex-col items-center justify-center space-y-4">
            <figure className="relative w-32 h-32 rounded-full">
              <Image alt="User profile picture" src={tempImage} fill priority />
            </figure>
            <header className="flex flex-col items-center md:items-start">
              <h1 className="text-xl">{user?.name}</h1>
              <h2 className="text-lg">EasyQuant</h2>
            </header>
          </div>
          <div className="w-full my-12">
            <ul className="flex justify-evenly items-center text-sm">
              <li className="text-center px-[4vw]">
                <button className="flex flex-col items-center space-y-1">
                  <h1 className="font-bold">Seen Offers</h1>
                  <p className="font-titillium opacity-60 rounded-full border w-8 border-opacity-70 border-jobzLightPurple shadow-[inset_0_0_30px_-10px] shadow-jobzDarkPurple">
                    {seenOffersCount}
                  </p>
                </button>
              </li>
              <li className="text-center px-[4vw]">
                <button className="flex flex-col items-center space-y-1">
                  <h1 className="font-bold">Accepted Offers</h1>
                  <p className="font-titillium opacity-60 rounded-full border w-8 border-opacity-70 border-jobzLightPurple shadow-[inset_0_0_30px_-10px] shadow-jobzDarkPurple">
                    {acceptedOffersCount}
                  </p>
                </button>
              </li>
              <li className="text-center px-[4vw]">
                <button className="flex flex-col items-center space-y-1">
                  <h1 className="font-bold">Rejected Offers</h1>
                  <p className="font-titillium opacity-60 rounded-full border w-8 border-opacity-70 border-jobzLightPurple shadow-[inset_0_0_30px_-10px] shadow-jobzDarkPurple">
                    {rejectedOffersCount}
                  </p>
                </button>
              </li>
            </ul>
          </div>
          <button
            className={`flex justify-evenly items-center border border-jobzWhite px-6 py-3 rounded-3xl self-center ${
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
          {toggleForm ? <OfferForm /> : null}
          <div className="flex flex-col items-center space-y-8 w-full p-8">
            {isLoading ? (
              <h1>Offers are loading ...</h1>
            ) : (
              offers?.map((offer: any) => (
                <OfferCard key={offer._id} offer={offer} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
