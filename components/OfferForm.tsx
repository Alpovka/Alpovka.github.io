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
    currency: "",
  });

  const [isRemote, setIsRemote] = useState(false);

  const { title, jobType, location, description, offeredMoney, currency } =
    formData;

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
      jobType: jobType ? jobType : "Part-Time",
      isRemote,
      location,
      description,
      offeredMoney: offeredMoney
        ? offeredMoney + " " + (currency ? currency : "EUR")
        : "Money not specified",
    };

    dispatch(createOffer(offerData));
  };

  return (
    <>
      <section className="max-sm:m-0 my-16">
        <form
          onSubmit={onSubmit}
          className="max-[350px]: max-sm:scale-[80%] space-y-4"
        >
          <div className="flex space-x-4 justify-evenly">
            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={onChange}
                autoComplete="off"
                className="bg-slate-800 rounded-sm px-4 py-1 focus:outline-jobzLightPurple"
                placeholder="Software Developer"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="jobType">Job Type</label>
              <select
                name="jobType"
                id="jobType"
                className="bg-slate-800 rounded-r-sm px-4 py-1 focus:outline-jobzLightPurple"
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
            </div>
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="isRemote" className="w-32 text-center">
                Check if the job can be done remotely
              </label>
              <input
                type="checkbox"
                name="title"
                id="title"
                autoComplete="off"
                onChange={handleCheckbox}
                className="w-4 h-4"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 -translate-y-3 ">
            <label htmlFor="description">
              Describe your job offer as you want
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={onChange}
              rows={6}
              spellCheck={false}
              autoComplete="off"
              className="bg-slate-800 max-h-32 rounded-sm px-4 py-1 resize-none focus:outline-jobzLightPurple overflow-y-scroll overflow-x-hidden scrollbar-thin  scrollbar-thumb-jobzLightPurple"
              placeholder="We want an awesome engineer who wants to be our team leader and passionate for coding stuff."
              required
            />
          </div>
          <div className="flex space-x-4 justify-evenly pb-8">
            <div className="flex flex-col space-y-2">
              <label htmlFor="location">Where this job from?</label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                autoComplete="off"
                onChange={onChange}
                className="bg-slate-800 rounded-sm px-4 py-1 focus:outline-jobzLightPurple"
                placeholder="Bayern / Germany"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="text">Let me know about the money.</label>
              <div className="flex">
                <input
                  type="number"
                  name="offeredMoney"
                  id="offeredMoney"
                  value={offeredMoney}
                  onChange={onChange}
                  autoComplete="off"
                  className="bg-slate-800 rounded-l-sm px-4 py-1 focus:outline-jobzLightPurple"
                  placeholder="(Optional)"
                />
                <select
                  name="currency"
                  id="currency"
                  className="bg-slate-800 rounded-r-sm ml-1 px-4 py-1 focus:outline-jobzLightPurple"
                  value={currency}
                  defaultValue={"EUR"}
                  onChange={onChange}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="button1 w-full">
            Offer Me!
          </button>
        </form>
      </section>
    </>
  );
};

export default OfferForm;
