import Link from "next/link";
import { SignUpForm } from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sign up to Beepy</h1>
      <p className="mt-2 text-sm text-gray-500">
        Let’s create a new account for you!
      </p>
      <SignUpForm />
      <p className="text-sm text-gray-500">
        {`Already have an account? `}
        <Link
          className="whitespace-nowrap text-sm text-gray-500 underline hover:no-underline"
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
