## Known limitations

- There is no nice way to tell Next 13 to do a hard navigation to a server component when the route doesn't contain a dynamic segment (e.g. /profile). The problem is that Next 13 is doing a soft navigation, even if we define `revalidate: 0` or `dynamic = "force-dynamic"` in the profile page. This causes the profile form being initialized with stale profile info. The current workaround to avoid the soft navigation is to navigate using `router.push()` instead of using the `next/link` component. See the `DynamicLink` component and this issue: https://github.com/vercel/next.js/issues/42991#issuecomment-1367466954
- It's not possible to resend the confirmation email. [Hopefully, it will be added soon.](https://github.com/supabase/supabase/discussions/3526#discussioncomment-1477673)
- When existing users signing up using `browserSupabaseClient.auth.signUp`, the response doesn't contain clear information we can use to tell the user that "they already have an account". Also, in this case, Supabase doesn't send an email to the user with a link they can click to login. See [this issue](https://github.com/supabase/supabase-js/issues/296).
- When Supabase redirects to our app, e.g. after the email confirmation link or the password reset link is clicked, it's not possible to get the user session on the server since the access token is passed using the URL fragment which is not available on the server. This means that the redirect to the right page needs to be done on the client. See [this response](https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599).
- When user clicks on an expired link in their email, how could we detect that in our app and redirect them to the login page? See [this discussion](https://github.com/supabase/supabase/discussions/11364).
- Module not found: Can't resolve 'encoding' - See [this issue](https://github.com/supabase/supabase-js/issues/612)
- During build on Vercel: A Node.js API is used (Buffer at line: 90) which is not supported in the Edge Runtime.
- Triggers - it's not possible to trigger a function when a certain column changes (e.g. when user confirms their email).

## TODO

- Restrict typing non-digits
- Edit record
- Delete record
- Try adding fading opacity on the record to highlight time direction
- Check that when changing a user, the query cache is emptied
- Update records table when new record is added
- update avatar in the Header when new avatar is saved
- remove profile
  - delete user row first
  - create trigger to remove auth.users row
- Write helper function to ensure that the email is a string:
  const { email } = searchParams ?? {};

## Supabase CLI

- `supabase db diff` - Dry run, output migration diff to the console
- `supabase db diff -f create_profiles` - Create migration file (migrations will run on `supabase start`)
- `supabase db reset` - Reset local db

## Troubleshooting

- Problem: Not getting emails in Inbucket when using local Supabase.
  - Solution: Open `supabase/config.toml` and make sure that `enable_confirmations` under `[auth.email]` is `true`.
- Problem: `AuthRetryableFetchError: Failed to fetch` when using local Supabase.
  - Solution: Make sure that Docker is running
