import { useDispatch } from "react-redux";
import { removeOffer, updateOffer } from "@/redux/offerSlice";
import { useRouter } from "next/router";
import { ImEye, ImCheckmark, ImCross } from "react-icons/im";
import { IoMdPin } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    const offerData = {
      offerId: offer._id,
      title,
      jobType,
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
      className="justify-center space-y-8 border border-gray-800 outline-none rounded-xl w-full p-6 shadow-jobzLightPurple shadow-[inset_0_0_20px_-10px] max-md:max-w-[600px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start space-y-1">
          {!toggleEditMode ? (
            <p className="font-semibold">{offer?.title}</p>
          ) : (
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChange}
              autoComplete="off"
              className="bg-transparent border border-jobzGrey border-opacity-30 rounded-sm px-4 py-1 outline-none"
              placeholder={title}
            />
          )}
          <div className="flex items-center justify-around space-x-1 text-sm w-full">
            {!toggleEditMode ? (
              <p>{offer?.jobType}</p>
            ) : (
              <input
                type="text"
                name="jobType"
                id="jobType"
                value={jobType}
                onChange={onChange}
                className="bg-transparent border border-jobzGrey border-opacity-30 w-28 rounded-sm px-4 py-1 outline-none"
                placeholder={jobType}
                autoComplete="off"
              />
            )}
            {!toggleEditMode ? (
              <p className={`${offer?.isRemote && "text-jobzGreen"}`}>
                {offer?.isRemote ? "Remote" : "On-site"}
              </p>
            ) : (
              <select
                name="canBeDoneType"
                id="canBeDoneType"
                className="bg-transparent border border-jobzGrey border-opacity-30 rounded-r-sm ml-1 px-4 py-1"
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
        <div className="flex justify-between items-center space-x-4">
          <div className="flex flex-col space-y-4 items-end">
            {offer?.didSeen || offer?.didAccepted || offer?.didRejected ? (
              <div className="flex justify-evenly space-x-4">
                {offer?.didSeen && (
                  <ImEye
                    size={12}
                    className="text-jobzGrey"
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
                <p>{offer?.location}</p>
              ) : (
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  autoComplete="off"
                  onChange={onChange}
                  className="bg-transparent border border-jobzGrey border-opacity-30 rounded-sm px-4 py-1 outline-none"
                  placeholder={location}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {!toggleEditMode ? (
        <p className="opacity-80">{offer?.description}</p>
      ) : (
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={onChange}
          rows={6}
          spellCheck={false}
          autoComplete="off"
          className="bg-transparent border w-full border-jobzGrey border-opacity-30 max-h-32 rounded-sm px-4 py-1 resize-none outline-none"
          placeholder={description}
        />
      )}
      <div className="flex justify-between items-center">
        {!toggleEditMode ? (
          <p className="text-sm">{offer?.offeredMoney}</p>
        ) : (
          <div className="flex">
            <input
              type="number"
              name="offeredMoney"
              id="offeredMoney"
              value={offeredMoney}
              onChange={onChange}
              autoComplete="off"
              className="bg-transparent border border-jobzGrey border-opacity-30 w-28 rounded-l-sm px-4 py-1 outline-none"
              placeholder={offeredMoney}
            />
            <select
              name="currency"
              id="currency"
              className="bg-transparent border border-jobzGrey border-opacity-30 rounded-r-sm ml-1 px-4 py-1"
              value={currency}
              defaultValue={currency}
              onChange={onChange}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        )}
        <div className="flex space-x-4 items-center">
          {!toggleEditMode ? (
            <a
              onClick={onDelete}
              className="text-sm text-jobzGrey hover:text-jobzOrange transition-colors cursor-pointer"
            >
              Withdraw offer
            </a>
          ) : (
            <a
              onClick={onClickEdit}
              className="text-sm text-jobzOrange hover:text-red-500 transition-colors cursor-pointer"
            >
              Cancel
            </a>
          )}
          {!toggleEditMode ? (
            <FiEdit
              size={24}
              opacity={0.8}
              cursor="pointer"
              className="hover:opacity-100 transition-opacity"
              onClick={onClickEdit}
            />
          ) : (
            <button
              type="submit"
              className="button1 bg-jobzDarkBlue hover:bg-jobzBlue"
            >
              Sumbit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default OfferCard;
