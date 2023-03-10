import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {};

const Register = (props: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const { name, email, password, passwordAgain } = formData;

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div>
      <Link href={"/Offers"}>
        <p>Alpovka JobZ</p>
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
