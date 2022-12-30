import { LogoutButton } from "./LogoutButton";
import { serverComponentSupabaseClient } from "./utils/supabase/server";

const HomePage = async () => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="mx-auto max-w-xs">
      <header className="flex items-center py-4">
        <h1 className="text-2xl font-semibold">Beepy</h1>
        <div className="ml-auto">{session?.user.email}</div>
        <div className="ml-6">
          <LogoutButton />
        </div>
      </header>
    </div>
  );
};

export default HomePage;
