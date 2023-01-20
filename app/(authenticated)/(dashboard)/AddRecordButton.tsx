"use client";

import { Button } from "components/Button";
import { browserSupabaseClient } from "utils/supabase/browser";

const AddRecordButton = () => {
  const addRecord = async () => {
    const { data, error } = await browserSupabaseClient
      .from("records")
      .insert([{ sys: 80, dia: 120, pulse: 75 }]);

    console.log({ data, error });
  };

  return <Button onClick={addRecord}>Add record</Button>;
};

export { AddRecordButton };
