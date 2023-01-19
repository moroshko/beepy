import { transformSupabaseError } from "utils/supabase/error";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { ProfileSections } from "./ProfileSections";

export const revalidate = 0; // I tried setting `export const dynamic = "force-dynamic";` instead, but it worked locally only (didn't work in production).
// See: https://github.com/vercel/next.js/issues/42991#issuecomment-1367466954

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

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">Profile</h1>
      <ProfileSections name={data.name ?? ""} />
    </>
  );
};

export default ProfilePage;
