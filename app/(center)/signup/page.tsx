import Link from "next/link";
import { SignUpForm } from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="text-gray-500 mt-2 text-sm">
        Let’s create a new account for you!
      </p>
      <SignUpForm />
      <p className="text-gray-500 text-sm">
        {`Already have an account? `}
        <Link
          className="text-gray-500 whitespace-nowrap text-sm underline hover:no-underline"
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
