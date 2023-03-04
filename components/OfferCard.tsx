import { useDispatch } from "react-redux";
import { removeOffer, updateOffer } from "@/redux/offerSlice";
import { useRouter } from "next/router";
import { ImEye, ImCheckmark, ImCross } from "react-icons/im";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { IoMdPin } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

interface OfferCardProp {
  offer: {
    _id: any;
    title: string;
    jobType: string;
    isRemote?: boolean;
    location: string;
    description: string;
    offeredMoney?: string;
    createdAt: Date;
    updatedAt: Date;
    didSeen: boolean;
    didAccepted: boolean;
    didRejected: boolean;
  };
}

const OfferCard = ({ offer }: OfferCardProp) => {
  const [showFullDescription, setFullDescription] = useState(false);
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: offer?.title,
    jobType: offer?.jobType,
    location: offer?.location,
    description: offer?.description,
    canBeDoneType: offer?.isRemote ? "Remote" : "On-Site",
    offeredMoney: offer?.offeredMoney?.split(" ")[0],
    currency: offer?.offeredMoney?.split(" ")[1],
  });

  const {
    title,
    jobType,
    location,
    description,
    offeredMoney,
    canBeDoneType,
    currency,
  } = formData;

  const shortDescription = offer?.description.slice(0, 130);
  const isDescriptionLong = offer?.description.length > 130;

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(removeOffer(offer._id));
    router.back(); // This stupid function allows right now to delete card and update the DOM, could not find better solution for this
  };

  const onClickEdit = () => setToggleEditMode((prev) => !prev);
  const onClickShowFullDescription = () => setFullDescription((prev) => !prev);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const offerData = {
      offerId: offer._id,
      title,
      jobType: jobType ? jobType : "Part-Time",
      isRemote: canBeDoneType === "Remote" ? true : false,
      location,
      description,
      offeredMoney: offeredMoney
        ? offeredMoney + " " + (currency ? currency : "EUR")
        : "Money not specified",
    };

    setToggleEditMode(false);
    dispatch(updateOffer(offerData));
    router.back(); // This stupid function allows right now to delete card and update the DOM, could not find better solution for this
  };

  return (
    <form
      onSubmit={onSubmit}
      className="justify-center max-[390px]:space-y-4 space-y-8 border border-gray-800 outline-none rounded-xl w-full p-6 shadow-jobzLightPurple shadow-[inset_0_0_20px_-10px] max-md:max-w-[600px]"
    >
      {!showFullDescription ? (
        <>
          <div
            className={`flex ${
              !toggleEditMode ? "max-[390px]:flex-col" : "max-[600px]:flex-col"
            } ${
              !toggleEditMode
                ? "max-[390px]:space-y-4"
                : "max-[600px]:space-y-4"
            } justify-between items-center`}
          >
            <div
              className={`flex flex-col ${
                !toggleEditMode
                  ? "max-[390px]:items-center"
                  : "max-[600px]:items-center"
              } items-start space-y-1`}
            >
              {!toggleEditMode ? (
                <p className="max-[390px]:text-center max-[310px]:text-sm font-semibold">
                  {offer?.title}
                </p>
              ) : (
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={onChange}
                  autoComplete="off"
                  className="bg-transparent max-[600px]:text-sm border border-jobzGrey border-opacity-30 rounded-sm px-4 py-1 outline-none"
                  placeholder={title}
                />
              )}
              <div
                className={
                  "flex opacity-80 items-center justify-around space-x-4 max-[390px]:text-xs text-sm w-full"
                }
              >
                {!toggleEditMode ? (
                  <p>{offer?.jobType}</p>
                ) : (
                  <select
                    name="jobType"
                    id="jobType"
                    className={`bg-transparent border max-[600px]:text-xs border-jobzGrey border-opacity-30 rounded-sm px-4 py-1 outline-none`}
                    value={jobType}
                    defaultValue={"Part-Time"}
                    onChange={onChange}
                  >
                    <option value="Part-Time">Part-Time</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contracted">Contracted</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Other">Other</option>
                  </select>
                )}
                {!toggleEditMode ? (
                  <p className={`${offer?.isRemote && "text-jobzGreen"}`}>
                    {offer?.isRemote ? "Remote" : "On-site"}
                  </p>
                ) : (
                  <select
                    name="canBeDoneType"
                    id="canBeDoneType"
                    className="bg-transparent border max-[600px]:text-xs border-jobzGrey border-opacity-30 rounded-r-sm ml-1 px-4 py-1"
                    value={canBeDoneType}
                    defaultValue={canBeDoneType}
                    onChange={onChange}
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-Site">On-Site</option>
                  </select>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-4 max-[390px]:space-y-2 max-[390px]:items-center items-end ">
              {!toggleEditMode &&
              (offer?.didSeen || offer?.didAccepted || offer?.didRejected) ? (
                <div className="flex justify-evenly items-center space-x-4">
                  {offer?.didSeen && (
                    <ImEye
                      size={12}
                      opacity={0.7}
                      className="text-jobzYellow"
                      data-te-toggle="tooltip"
                      title="Seen"
                    />
                  )}
                  {offer?.didAccepted && (
                    <ImCheckmark
                      size={12}
                      className="text-jobzGreen"
                      data-te-toggle="tooltip"
                      title="Accepted"
                    />
                  )}
                  {offer?.didRejected && (
                    <ImCross
                      size={12}
                      className="text-jobzOrange"
                      data-te-toggle="tooltip"
                      title="Rejected"
                    />
                  )}
                </div>
              ) : null}
              <div className="flex space-x-1 items-center">
                <IoMdPin />
                {!toggleEditMode ? (
                  <p className="max-[390px]:opacity-80 max-[390px]:text-sm">
                    {offer?.location}
                  </p>
                ) : (
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    autoComplete="off"
                    onChange={onChange}
                    className="bg-transparent max-[600px]:opacity-80 max-[600px]:text-sm border border-jobzGrey border-opacity-30 rounded-sm px-4 py-1 outline-none"
                    placeholder={location}
                  />
                )}
              </div>
            </div>
          </div>
          {!toggleEditMode ? (
            <div className="relative flex justify-between max-[390px]:text-sm items-center">
              <p className="opacity-80">
                {shortDescription}
                {isDescriptionLong && "..."}
              </p>
              {isDescriptionLong && (
                <button
                  className="absolute -right-10 flex items-center justify-center bg-jobzDarkPurple rounded-full p-2 cursor-pointer"
                  onClick={onClickShowFullDescription}
                  data-te-toggle="tooltip"
                  title="See all description"
                >
                  <GoChevronRight className="text-jobzLightPurple max-[390px]:w-4 max-[390px]:h-4 w-6 h-6" />
                </button>
              )}
            </div>
          ) : (
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={onChange}
              rows={6}
              spellCheck={false}
              autoComplete="off"
              className="bg-transparent border max-[600px]:text-sm w-full border-jobzGrey border-opacity-30 max-h-32 max-[600px]:max-h-24 rounded-sm px-4 py-1 resize-none outline-none scrollbar-thin scrollbar-thumb-jobzLightPurple"
              placeholder={description}
            />
          )}
          <div
            className={`flex ${
              toggleEditMode && "max-[600px]:flex-col"
            } justify-between space-x-4 space-y-4 items-center`}
          >
            {!toggleEditMode ? (
              <p className="max-[390px]:text-xs text-sm">
                {offer?.offeredMoney}
              </p>
            ) : (
              <div className="flex">
                <input
                  type="number"
                  name="offeredMoney"
                  id="offeredMoney"
                  value={offeredMoney}
                  onChange={onChange}
                  autoComplete="off"
                  className="bg-transparent border max-[600px]:text-xs border-jobzGrey border-opacity-30 w-28 rounded-l-sm px-4 py-1 outline-none"
                  placeholder={offeredMoney}
                />
                <select
                  name="currency"
                  id="currency"
                  className="bg-transparent border max-[600px]:text-xs border-jobzGrey border-opacity-30 rounded-r-sm ml-1 px-4 py-1"
                  value={currency}
                  defaultValue={currency}
                  onChange={onChange}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            )}
            <div className=" flex space-x-4 max-[390px]:space-x-2 items-center">
              {!toggleEditMode ? (
                <a
                  onClick={onDelete}
                  className="max-[390px]:text-xs text-sm text-center text-jobzGrey hover:text-jobzOrange transition-colors cursor-pointer"
                >
                  Withdraw offer
                </a>
              ) : (
                <a
                  onClick={onClickEdit}
                  className="text-sm max-[600px]:text-xs text-jobzOrange hover:text-red-500 transition-colors cursor-pointer"
                >
                  Cancel
                </a>
              )}
              {!toggleEditMode ? (
                <FiEdit
                  size={24}
                  opacity={0.8}
                  cursor="pointer"
                  className="max-[390px]:text-xs hover:opacity-100 transition-opacity"
                  onClick={onClickEdit}
                />
              ) : (
                <button
                  type="submit"
                  className="button1 max-[600px]:text-xs bg-jobzDarkBlue hover:bg-jobzBlue"
                >
                  Sumbit
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-between items-center space-y-6">
          <p className="max-h-[230px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-jobzLightPurple pr-8">
            {offer?.description}
          </p>
          <div className="flex w-full justify-between items-center space-x-4">
            <p className="text-sm">{offer?.offeredMoney}</p>
            <button
              className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity bg-jobzDarkPurple rounded-full p-2 cursor-pointer"
              onClick={onClickShowFullDescription}
              data-te-toggle="tooltip"
              title="Back to normal card view"
            >
              <GoChevronLeft size={24} className="text-jobzLightPurple" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default OfferCard;
