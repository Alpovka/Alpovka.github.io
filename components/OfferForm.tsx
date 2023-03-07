import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { createOffer } from "../redux/offerSlice";

type OfferFormProps = {
  fetchStatus: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
};

const OfferForm = ({ fetchStatus }: OfferFormProps) => {
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

  const dispatch = useDispatch<AppDispatch>();

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
      <section className="my-16 max-sm:w-full px-8">
        <form onSubmit={onSubmit} className="space-y-4 ">
          <div className="flex max-sm:flex-col min-sm:space-x-4 max-sm:space-y-4 justify-evenly">
            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={onChange}
                maxLength={20}
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
            <div className="flex max-sm:hidden min-sm:visible flex-col items-center space-y-2">
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
          <div className="flex flex-col space-y-2 min-sm:-translate-y-3 max-sm:translate-y-0 ">
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
          <div className="flex max-sm:flex-col min-sm:space-x-4 justify-evenly pb-8">
            <div className="flex max-sm:flex-row max-[380px]:flex-wrap max-[380px]:space-y-2 justify-center">
              <div className="flex max-sm:w-full flex-col space-y-2">
                <label htmlFor="location">Where this job from?</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  autoComplete="off"
                  onChange={onChange}
                  maxLength={15}
                  className="bg-slate-800 rounded-sm px-4 py-1 focus:outline-jobzLightPurple"
                  placeholder="City"
                  required
                />
              </div>
              <div className="flex max-sm:visible sm:hidden flex-col items-center space-y-2 max-[380px]:py-6">
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
            <div className="flex flex-col space-y-2">
              <label htmlFor="text">Let me know about the money.</label>
              <div className="flex max-[380px]:flex-wrap max-[380px]:space-y-2">
                <input
                  type="number"
                  name="offeredMoney"
                  id="offeredMoney"
                  value={offeredMoney}
                  onChange={onChange}
                  autoComplete="off"
                  className="bg-slate-800 rounded-l-sm px-4 py-1 focus:outline-jobzLightPurple max-[380px]:w-full"
                  placeholder="(Optional)"
                />
                <select
                  name="currency"
                  id="currency"
                  className="bg-slate-800 rounded-r-sm ml-1 max-[380px]:m-0 px-4 py-1 max-sm:w-full focus:outline-jobzLightPurple"
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
          <button
            type="submit"
            className={`${
              fetchStatus.isSuccess && fetchStatus.isLoading
                ? "bg-jobzGreen hover:bg-jobzGreen"
                : fetchStatus.isError
                ? "bg-jobzOrange hover:bg-jobzOrange"
                : null
            } button1 w-full flex items-center space-x-4 justify-center`}
          >
            <p>Offer Me!</p>
            {fetchStatus.isLoading && (
              <Oval
                height={20}
                width={20}
                color="white"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="white"
                strokeWidth={5}
                strokeWidthSecondary={5}
              />
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default OfferForm;
