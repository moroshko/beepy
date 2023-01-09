import { LogoutButton } from "./LogoutButton";
import { serverComponentSupabaseClient } from "./utils/supabase/server";

const HomePage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is logged out, we render null here to avoid having the page below flashing
  // before the user sees the Login page.
  // SupabaseListener is responsible for the redirect.
  // Using server-side redirect (using https://beta.nextjs.org/docs/api-reference/redirect)
  // doesn't work because when the user clicks the confirm email link, the `user` will be null
  // here on the server.
  // See here why we need a client-side redirect: https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599
  if (user === null) {
    return null;
  }

  return (
    <div className="mx-auto max-w-xs">
      <header className="flex items-center py-4">
        <h1 className="text-2xl font-semibold">Beepy</h1>
        <div className="ml-auto">{user.email}</div>
        <div className="ml-6">
          <LogoutButton />
        </div>
      </header>
    </div>
  );
};

export default HomePage;
