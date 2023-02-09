import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOffer } from "../redux/offerSlice";

type Props = {};

const OfferForm = ({}: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    location: "",
    description: "",
    offeredMoney: "",
  });

  const [isRemote, setIsRemote] = useState(false);

  const { title, jobType, location, description, offeredMoney } = formData;

  const dispatch = useDispatch();

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckbox = (e: any) => {
    setIsRemote(e.target.checked);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const offerData = {
      title,
      jobType,
      isRemote,
      location,
      description,
      offeredMoney: Number(offeredMoney),
    };

    dispatch(createOffer(offerData));
  };

  return (
    <>
      <section>
        <form onSubmit={onSubmit}>
          <div className="border border-b-amber-700">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChange}
            />
          </div>
          <div className="border border-b-amber-700">
            <label htmlFor="jobType">Job Type</label>
            <input
              type="text"
              name="jobType"
              id="jobType"
              value={jobType}
              onChange={onChange}
            />
          </div>
          <div className="border border-b-amber-700">
            <label htmlFor="isRemote">Can the job be done remotely</label>
            <input
              type="checkbox"
              name="title"
              id="title"
              onChange={handleCheckbox}
            />
          </div>
          <div className="border border-b-amber-700">
            <label htmlFor="location">Where this job from?</label>
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={onChange}
            />
          </div>
          <div className="border border-b-amber-700">
            <label htmlFor="description">
              Describe your job offer as you want
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={onChange}
            />
          </div>
          <div className="border border-b-amber-700">
            <label htmlFor="text">
              Let me know about the money. {"Optional"}
            </label>
            <input
              type="number"
              name="offeredMoney"
              id="offeredMoney"
              value={offeredMoney}
              onChange={onChange}
            />
          </div>
          <button type="submit">Offer your offer</button>
        </form>
      </section>
    </>
  );
};

export default OfferForm;
