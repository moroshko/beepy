import { serverComponentSupabaseClient } from "utils/supabase/server";
import { ChoosePasswordForm } from "./ChoosePasswordForm";

const ChoosePasswordPage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("\n--- ChoosePasswordPage ---");
  console.log({ session });
  console.log("");

  return (
    <>
      <h1 className="text-2xl font-semibold">Choose your password</h1>
      <p className="mt-2 text-sm text-grey-500">
        {`You are logged in as `}
        <span className="font-semibold">{session?.user.email}</span>
      </p>
      <ChoosePasswordForm />
    </>
  );
};

export default ChoosePasswordPage;
