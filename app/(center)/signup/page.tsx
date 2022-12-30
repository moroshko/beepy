import { SignUpForm } from "./SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="mt-2 text-sm text-grey-500">
        Let’s create a new account for you!
      </p>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
