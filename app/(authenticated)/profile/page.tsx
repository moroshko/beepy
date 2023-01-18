import { transformSupabaseError } from "utils/supabase/error";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { ProfileSections } from "./ProfileSections";

const ProfilePage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    .select("name, avatar")
    .eq("id", user?.id)
    .single();

  if (error !== null) {
    throw transformSupabaseError(error);
  }

  console.log({ data, error });

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">Profile</h1>
      <ProfileSections name={data.name ?? ""} />
    </>
  );
};

export default ProfilePage;
