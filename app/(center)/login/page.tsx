import Link from "next/link";
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <LoginForm />
      <p className="text-gray-500 text-sm">
        {`Don’t have an account yet? `}
        <Link
          className="text-gray-500 whitespace-nowrap text-sm underline hover:no-underline"
          href="/signup"
        >
          Create new account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
