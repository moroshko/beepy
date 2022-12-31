/*
  We need this page since it's currently not possible to redirect the user on the server
  after they click the "Confirm email" or the "Reset password" link.

  We rely on the SupabaseListener component to do the redirect.

  See: https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599
*/

const AuthenticatedPage = () => {
  return <h1 className="text-2xl font-semibold">Please wait...</h1>;
};

export default AuthenticatedPage;
