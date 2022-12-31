import Link from "next/link";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { ChoosePasswordForm } from "./ChoosePasswordForm";

const ChoosePasswordPage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <h1 className="text-2xl font-semibold">Choose your password</h1>
      <ChoosePasswordForm />
      <p className="mt-6 text-sm text-grey-500">
        You are logged in as
        <br />
        <span className="font-semibold">{session?.user.email}</span>
      </p>
      <p className="mt-4 flex justify-between text-sm text-grey-500">
        <Link className="underline hover:no-underline" href="/">
          Back to homepage
        </Link>
        <Link className="underline hover:no-underline" href="/">
          Logout (TODO)
        </Link>
      </p>
    </>
  );
};

export default ChoosePasswordPage;
