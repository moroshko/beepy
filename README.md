## TODO

- Edit record
- Delete record
- Try adding fading opacity on the record to highlight time direction
- Check that when changing a user, the query cache is emptied
- Update records table when new record is added
- update avatar in the Header when new avatar is saved
- remove profile
  - delete user row first
  - create trigger to remove auth.users row
- Import existing data
- Write helper function to ensure that the email is a string:
  const { email } = searchParams ?? {};

## Known Issues

- To run drizzle studio, `pg` must be installed as dev dependency. See [this issue](https://github.com/drizzle-team/drizzle-orm/issues/842#issuecomment-1646073742).
