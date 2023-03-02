import { useDispatch } from "react-redux";
import { removeOffer } from "@/redux/offerSlice";
import { useRouter } from "next/router";
import { ImEye, ImCheckmark, ImCross } from "react-icons/im";
import { IoMdPin } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

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
  const router = useRouter();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(removeOffer(offer._id));
    router.back(); // This stupid function allows right now to delete card and update the DOM, could not find other solution for this
  };

  return (
    <div className="justify-center space-y-8 border border-gray-800 outline-none rounded-xl w-full p-6 shadow-jobzLightPurple shadow-[inset_0_0_20px_-10px] max-md:max-w-[600px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start space-y-1">
          <p className="font-semibold">{offer?.title}</p>
          <div className="flex items-center justify-around space-x-1 text-sm w-full">
            <p>{offer?.jobType}</p>
            <p className={`${offer?.isRemote && "text-jobzGreen"}`}>
              {offer?.isRemote ? "Remote" : "On-site"}
            </p>
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
              <p>{offer?.location}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="opacity-80">{offer?.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm">{offer?.offeredMoney}</p>
        <div className="flex space-x-4 items-center">
          <button
            onClick={onDelete}
            className="text-sm text-jobzGrey hover:text-jobzOrange transition-colors"
          >
            Withdraw offer
          </button>
          <FiEdit
            size={24}
            opacity={0.8}
            cursor="pointer"
            className="hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
