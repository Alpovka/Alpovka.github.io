import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "@/redux/authUserSlice";
import { reset as resetOffers, getOffers } from "@/redux/offerSlice";
import OfferForm from "@/components/OfferForm";
import OfferCard from "@/components/OfferCard";

type Props = {};

function Dashboard({}: Props) {
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

  if (isLoading) {
    return <h1>Offers are loading ...</h1>;
  }

  return (
    <div>
      {!user ? (
        <h1>User deleted or not created</h1>
      ) : (
        <>
          <button className="cursor-pointer" onClick={onLogout}>
            LogOut
          </button>
          <h1>{user?.name}</h1>
          <OfferForm />
          {offers?.map((offer: any) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;
