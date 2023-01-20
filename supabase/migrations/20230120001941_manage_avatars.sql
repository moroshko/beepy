create policy "Allow users to manage their avatars 1ige2ga_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'profiles'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Allow users to manage their avatars 1ige2ga_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'profiles'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Allow users to manage their avatars 1ige2ga_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'profiles'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Allow users to manage their avatars 1ige2ga_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'profiles'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



