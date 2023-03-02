import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { login, reset } from "@/redux/authUserSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLongLeftIcon,
  AtSymbolIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Head from "next/head";

type Props = {};

const Login = (props: Props) => {
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess && user) {
      router.replace("/JobZ/Dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onChange = (e: { target: { name: any; value: any } }) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const passValidateRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!passValidateRegex.test(password)) {
      setError(
        "Not valid password! Password must contain, 6-20 characters, including at least 1 upper and lowercase letter, 1 number and 1 symbol."
      );
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const handleForgotPasswordClick = () => router.push("/JobZ/forgot-password");

  return (
    <div className="flex flex-col bg-jobzBlack h-screen justify-evenly items-center">
      <Head>
        <title>Alpovka JobZ/Login</title>
        <meta name="description" content="Alpovka JobZ Entrance" />
        <link rel="icon" type="image/png" href="../images/favicon.png" />
      </Head>
      <Link
        href={"/JobZ"}
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
          }`}
        >
          <p id="heading">Login</p>
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
          <div className="field">
            <LockClosedIcon className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="8-15 characters, including at least 1 number and 1 symbol."
              onChange={onChange}
              className="input-field"
              autoComplete="off"
              required
            />
          </div>
          {error && <p className="text-jobzOrange text-center mt-4">{error}</p>}
          <button className="button1 mt-8">
            {!isLoading ? "Submit" : "Logging..."}
          </button>
          <button
            className="button2 hover:text-jobzOrange mt-4"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password
          </button>
          <div className="flex items-center justify-around mb-8 mt-8">
            <p className="text-cente">Don't you have an account ?</p>
            <button
              className="button2 text-center"
              onClick={() => router.push("/JobZ/Register")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
      <footer className="font-titillium text-jobzWhite text-xs">
        <p className="text-center">Alperen KARAVELIOGLU &copy; 2023</p>
      </footer>
    </div>
  );
};

export default Login;
