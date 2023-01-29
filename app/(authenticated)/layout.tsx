import { ReactNode } from "react";
import { transformSupabaseError } from "utils/supabase/error_";
import { serverComponentSupabaseClient } from "utils/supabase/server";
import { Header } from "./Header/Header";
import { ProfileProvider } from "./ProfileProvider";
import { UserProvider } from "./UserProvider";

type Props = {
  children: ReactNode;
};

const AuthenticatedLayout = async ({ children }: Props) => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is logged out, we render null here to avoid having the page below flashing
  // before the user sees the Login page (SupabaseListener is responsible for the redirect).
  // Using server-side redirect (using https://beta.nextjs.org/docs/api-reference/redirect)
  // doesn't work because when the user clicks the confirm email link, the `user` will be null
  // here on the server.
  // See here why a client-side redirect is required: https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599
  if (user === null) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("name, avatar")
    .eq("id", user.id)
    .single();

  if (profile === null) {
    throw transformSupabaseError(profileError);
  }

  let avatarUrl = null;

  if (profile.avatar !== null) {
    const {
      data: { publicUrl },
    } = await supabase.storage.from("profiles").getPublicUrl(profile.avatar);

    avatarUrl = publicUrl;
  }

  return (
    <UserProvider user={user}>
      <ProfileProvider profile={{ ...profile, avatarUrl }}>
        <Header />
        <div className="mx-auto max-w-5xl px-4 py-4 xs:py-8">{children}</div>
      </ProfileProvider>
    </UserProvider>
  );
};

export default AuthenticatedLayout;
