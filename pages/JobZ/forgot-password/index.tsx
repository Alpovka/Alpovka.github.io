import Link from "next/link";
import { useState } from "react";
import { ArrowLongLeftIcon, AtSymbolIcon } from "@heroicons/react/24/solid";
import { forgotPassword } from "@/pages/api/users/authUserService";
import Head from "next/head";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e: { target: { name: any; value: any } }) => {
    setSuccess(false);
    setError("");
    setFormData({
      email: e.target.value,
    });
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    forgotPassword(formData).then(
      () => {
        setError("");
        setSuccess(true);
        setLoading(false);
      },
      () => {
        setError("Ups! Something went wrong.");
        setSuccess(false);
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col bg-jobzBlack h-screen justify-evenly items-center">
      <Head>
        <title>Alpovka JobZ/Forgot Password</title>
        <meta name="description" content="Alpovka JobZ Forgot Password" />
        <link rel="icon" type="image/png" href="../images/favicon.png" />
      </Head>
      <Link
        href={"/JobZ/Login"}
        className="absolute top-5 left-5 cta flex items-center justify-center self-start scale-[75%]"
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

      <section>
        <form
          onSubmit={onSubmit}
          className={`form w-[95vw] text-xs sm:w-[550px] sm:text-base font-titillium text-jobzWhite ${
            error && "hover:border-jobzOrange"
          } ${success && "hover:border-jobzGreen"}`}
        >
          <p id="heading">Send Password Reset Link</p>
          <div className="field">
            <AtSymbolIcon className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
              className="input-field"
              autoComplete="off"
              required
            />
          </div>
          {error && <p className="text-jobzOrange text-center mt-4">{error}</p>}
          {success && !loading && (
            <p className="text-jobzGreen text-center mt-4">
              The link to reset your password has been sent to your email
            </p>
          )}
          <button
            className={`button1 mt-4 mb-8 ${success && "hover:bg-jobzGreen"}`}
          >
            {loading ? "Sending..." : success ? "Click to Resend" : "Send"}
          </button>
        </form>
      </section>
      <footer className="font-titillium text-jobzWhite text-xs">
        <p className="text-center">Alperen KARAVELIOGLU &copy; 2023</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
