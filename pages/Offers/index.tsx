import Link from "next/link";

type Props = {};

const Redirector = (props: Props) => {
  return (
    <div>
      <Link href={"/Offers/Login"}>
        <p>Login</p>
      </Link>
      <Link href={"/Offers/Register"}>
        <p>Register</p>
      </Link>
    </div>
  );
};

export default Redirector;
