import { useDispatch } from "react-redux";
import { removeOffer } from "@/redux/offerSlice";
import { useRouter } from "next/router";

interface OfferCardProp {
  offer: {
    _id: any;
    title: string;
    jobType: string;
    isRemote?: boolean;
    location: string;
    description: string;
    offeredMoney?: number;
    createdAt: Date;
    updatedAt: Date;
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
    <div className="justify-center space-y-4 border-2 border-purple-500 rounded-sm w-[250px] h-[200px]">
      <div className="flex space-x-4 ">
        <div>{offer?.title}</div>
        <button onClick={onDelete} className="text-red-500">
          X
        </button>
      </div>
      <h1>{offer?.jobType}</h1>
      <h1>{offer?.isRemote ? "Remote" : "On-site"}</h1>
      <h1>{offer?.location}</h1>
      <h1>{offer?.description}</h1>
      <h1>{offer?.offeredMoney?.toString()}</h1>
    </div>
  );
};

export default OfferCard;
