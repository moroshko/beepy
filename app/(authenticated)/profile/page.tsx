import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ProfileSections } from "./components/ProfileSections";

// export const revalidate = 0; // I tried setting `export const dynamic = "force-dynamic";` instead, but it worked locally only (didn't work in production).
// See: https://github.com/vercel/next.js/issues/42991#issuecomment-1367466954

const ProfilePage = async () => {
  const user = await currentUser();

  if (user === null) {
    redirect("/login");
  }

  const userEmail = user.emailAddresses[0].emailAddress;

  return (
    <>
      <h1 className="text-xl font-medium">Profile</h1>
      <p className="mb-6 mt-2 text-grey-500">{`You are logged in as ${userEmail}`}</p>
      <ProfileSections />
    </>
  );
};

export default ProfilePage;
