import { formatDate } from "utils/date";
import { Database } from "utils/supabase/types";
import { AddRecordButton } from "./AddRecordButton";

type BloodPressureRecord = Pick<
  Database["public"]["Tables"]["records"]["Row"],
  "id" | "sys" | "dia" | "pulse" | "created_at"
>;

type Props = {
  records: BloodPressureRecord[];
};

const Records = ({ records }: Props) => {
  return (
    <div className="flex justify-between">
      <div className="rounded border border-grey-200">
        {/* Note: `border-radius` does not apply to table elements when `border-collapse` is `collapse` (which is Tailwind's reset). Therefore, wrapping the table with a bordered div.*/}
        <table className="divide-y divide-grey-200">
          <thead>
            <tr className="text-sm text-grey-500">
              <th className="px-4 py-3 text-left font-medium uppercase">
                Time
              </th>
              <th className="px-4 py-3 text-right font-medium uppercase">
                Sys
              </th>
              <th className="px-4 py-3 text-right font-medium uppercase">
                Dia
              </th>
              <th className="px-4 py-3 text-right font-medium uppercase">
                Pulse
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-200">
            {records.map(({ id, sys, dia, pulse, created_at }) => {
              return (
                <tr className="cursor-pointer hover:bg-grey-50" key={id}>
                  <td className="px-4 py-3 font-light text-grey-600">
                    {formatDate(created_at)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{sys}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{dia}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{pulse}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <AddRecordButton />
      </div>
    </div>
  );
};

export { Records };
