import { transformSupabaseError } from "utils/supabase/error";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { Records } from "./Records";

const DashboardPage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: records, error: recordsError } = await supabase
    .from("records")
    .select("id, sys, dia, pulse, created_at")
    .eq("user_id", user?.id);

  if (records === null) {
    throw transformSupabaseError(recordsError);
  }

  return (
    <>
      <Records records={records} />
    </>
  );
};

export default DashboardPage;
