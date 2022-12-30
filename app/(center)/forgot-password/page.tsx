import { ForgotPasswordForm } from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Forgot password?</h1>
      <p className="mt-2 text-sm text-grey-500">
        No worries! We’ll send you reset instructions.
      </p>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
