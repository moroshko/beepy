"use client";

import { useUser } from "(authenticated)/UserProvider";
import { Button } from "components/Button";
import { useRefetchRecords } from "utils/hooks/useRecords";
import { browserSupabaseClient } from "utils/supabase/browser";

const AddRecordButton = () => {
  const user = useUser();
  const refetchRecords = useRefetchRecords(user.id);
  const addRecord = async () => {
    const { data, error } = await browserSupabaseClient
      .from("records")
      .insert([{ sys: 85, dia: 132, pulse: 81 }]);

    console.log({ data, error });

    refetchRecords();
  };

  return <Button onClick={addRecord}>Add record</Button>;
};

export { AddRecordButton };
