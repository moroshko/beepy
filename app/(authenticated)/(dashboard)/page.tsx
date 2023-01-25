import { transformSupabaseError } from "utils/supabase/error";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { Records } from "./Records";

const DashboardPage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: initialRecords, error } = await supabase
    .from("records")
    .select("id, sys, dia, pulse, created_at")
    .order("created_at", { ascending: false })
    .limit(10)
    .eq("user_id", user?.id);

  if (initialRecords === null) {
    throw transformSupabaseError(error);
  }

  return (
    <div className="flex justify-center">
      <Records initialRecords={initialRecords} />
    </div>
  );
};

export default DashboardPage;
