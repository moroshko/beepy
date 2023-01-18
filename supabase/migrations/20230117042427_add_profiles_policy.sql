create policy "Allow users to operate on their profiles"
on "public"."profiles"
as permissive
for all
to authenticated
using ((auth.uid() = id));



