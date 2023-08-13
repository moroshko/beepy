import Link from "next/link";
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <LoginForm />
      <p className="text-sm text-grey-500">
        {`Don’t have an account yet? `}
        <Link
          className="whitespace-nowrap text-sm text-grey-500 underline hover:no-underline"
          href="/signup"
        >
          Create new account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
