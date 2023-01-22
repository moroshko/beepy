import { Database } from "utils/supabase/types";

export type BloodPressureRecord = Pick<
  Database["public"]["Tables"]["records"]["Row"],
  "id" | "sys" | "dia" | "pulse" | "created_at"
>;
