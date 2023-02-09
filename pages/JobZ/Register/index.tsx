import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { register, reset } from "@/redux/authUserSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Register = (props: Props) => {
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const { name, email, password, passwordAgain, organization } = formData;

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
      router.push("/Offers/Dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      setError("Passwords do not match");
    } else {
      const userData = {
        name,
        organization,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <Link href={"/Offers"}>
        <p>Alpovka offerZ</p>
        <p className="text-red-600">{error}</p>
      </Link>

      <section>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Your name"
            onChange={onChange}
          />
          <input
            type="text"
            id="organization"
            name="organization"
            value={organization}
            placeholder="Organization name (Optional)"
            onChange={onChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Your email"
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full"
            id="password"
            name="password"
            value={password}
            placeholder="8-15 characters, including at least 3 number and 1 symbol."
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full"
            id="passwordAgain"
            name="passwordAgain"
            value={passwordAgain}
            placeholder="Confirm your password"
            onChange={onChange}
          />
          <button className="bg-orange-300 py-5 px-10 rounded-md text-black font-bold text-lg hover:bg-[#F7AB0A] transition duration-200 ease-in-out">
            Create your account
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
