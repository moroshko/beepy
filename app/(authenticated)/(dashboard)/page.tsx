import { transformSupabaseError } from "utils/supabase/error";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { AddRecordButton } from "./AddRecordButton";
import { Records } from "./Records";

const DashboardPage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: records, error: recordsError } = await supabase
    .from("records")
    .select("id, sys, dia, pulse, created_at")
    .order("created_at", { ascending: false })
    .limit(10)
    .eq("user_id", user?.id);

  if (records === null) {
    throw transformSupabaseError(recordsError);
  }

  console.log(records);

  return (
    <div className="sm:flex sm:flex-row sm:justify-between">
      <Records records={records} />
      <div>
        <AddRecordButton />
      </div>
    </div>
  );
};

export default DashboardPage;
