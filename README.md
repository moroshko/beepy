## Known limitations

- It's not possible to resend the confirmation email. [Hopefully, it will be added soon.](https://github.com/supabase/supabase/discussions/3526#discussioncomment-1477673)
- When existing users signing up using `browserSupabaseClient.auth.signUp`, the response doesn't contain clear information we can use to tell the user that "they already have an account". Also, in this case, Supabase doesn't send an email to the user with a link they can click to login. See [this issue](https://github.com/supabase/supabase-js/issues/296).
- When Supabase redirects to our app, e.g. after the email confirmation link or the password reset link is clicked, it's not possible to get the user session on the server since the access token is passed using the URL fragment which is not available on the server. This means that the redirect to the right page needs to be done on the client. See [this response](https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599).
- When user clicks on an expired link in their email, how could we detect that in our app and redirect them to the login page? See [this discussion](https://github.com/supabase/supabase/discussions/11364).
- Module not found: Can't resolve 'encoding' - See [this issue](https://github.com/supabase/supabase-js/issues/612)
- During build on Vercel: A Node.js API is used (Buffer at line: 90) which is not supported in the Edge Runtime.

## TODO

- When logged out and visiting the home page, redirect to login
- Write helper function to ensure that the email is a string:
  const { email } = searchParams ?? {};
