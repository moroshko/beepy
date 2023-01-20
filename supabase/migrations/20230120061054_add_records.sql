drop policy "Allow users to operate on their profiles" on "public"."profiles";

create policy "Allow users to manage their profiles"
on "public"."profiles"
as permissive
for all
to authenticated
using ((auth.uid() = id));

create table "public"."records" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null default auth.uid(),
    "sys" integer not null,
    "dia" integer not null,
    "pulse" integer not null,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."records" enable row level security;

CREATE UNIQUE INDEX records_pkey ON public.records USING btree (id);

alter table "public"."records" add constraint "records_pkey" PRIMARY KEY using index "records_pkey";

alter table "public"."records" add constraint "records_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."records" validate constraint "records_user_id_fkey";

create policy "Allow users to manage their records"
on "public"."records"
as permissive
for all
to public
using ((auth.uid() = user_id));



