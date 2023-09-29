import { getUser } from "@/api/current-user/route";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ProfileForm } from "./components/ProfileForm";

const ProfilePage = async () => {
  const clerkUser = await currentUser();

  if (clerkUser === null) {
    redirect("/login");
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;
  const user = await getUser(clerkUser.id);

  return (
    <div className="mx-auto mt-4 max-w-md xs:mt-8">
      <h1 className="text-xl font-medium">Profile</h1>
      <p className="mb-6 mt-2 text-gray-500">{`You are logged in as ${userEmail}`}</p>
      {user === null ? (
        <p className="text-error">Failed to fetch user profile.</p>
      ) : (
        <ProfileForm user={user} />
      )}
    </div>
  );
};

export default ProfilePage;
