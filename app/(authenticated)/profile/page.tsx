import { serverComponentSupabaseClient } from "utils/supabase/server";
import { ProfileSections } from "./ProfileSections";

// export const revalidate = 0; // I tried setting `export const dynamic = "force-dynamic";` instead, but it worked locally only (didn't work in production).
// See: https://github.com/vercel/next.js/issues/42991#issuecomment-1367466954

const ProfilePage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <h1 className="text-xl font-medium">Profile</h1>
      <p className="mt-2 mb-6 text-grey-500">{`You are logged in as ${user?.email}`}</p>
      <ProfileSections />
    </>
  );
};

export default ProfilePage;
