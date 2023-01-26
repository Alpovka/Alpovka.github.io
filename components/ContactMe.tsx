import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

const ContactMe = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const ebody =
      "Hello! My name is: " + data.name + "%0D%0A%0D%0A" + data.message;
    window.location.href =
      "mailto:myemail@mycompany.com?subject=testemail&body=" + ebody;
  };

  return (
    <div className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <div className="flex flex-col xl:flex-row md:items-center xl:space-x-20 space-y-10 mt-10 px-10 ">
        <div className="space-y-2 mt-20">
          <h4 className="text-2xl md:text-4xl font-semibold text-center">
            What are you waiting for?{" "}
          </h4>
          <h4 className="text-4xl font-semibold text-center">
            <span className="decoration-orange-300 underline">
              {"Let's Talk!"}
            </span>
          </h4>
        </div>
        <div className="space-y-5 sm:space-y-10">
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-orange-300 h-7 w-7 animate-pulse" />
            <p className="text-2xl">karavelx@gmail.com</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-orange-300 h-7 w-7 animate-pulse" />
            <p className="text-2xl">41200 Izmit/Kocaeli/Turkey</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 pb-10 pr-5 sm:pr-0 scale-[70%] sm:scale-100"
          >
            <div className="flex space-x-2">
              <input
                {...register("name")}
                placeholder="Name"
                className="contactInput"
                type="text"
              />
              <input
                {...register("email")}
                placeholder="Email"
                className="contactInput"
                type="email"
              />
            </div>
            <input
              {...register("subject")}
              placeholder="Subject"
              className="contactInput"
              type="text"
            />
            <textarea
              {...register("message")}
              placeholder="Message ..."
              className="contactInput min-h-[150px] max-h-[300px]"
            />
            <button className="bg-orange-300 py-5 px-10 rounded-md text-black font-bold text-lg hover:bg-[#F7AB0A] transition duration-200 ease-in-out">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
