"use client";

import { useUser } from "(authenticated)/UserProvider";
import { BloodPressureRecord } from "types";
import { formatDate } from "utils/date";
import { useRecords } from "utils/hooks/useRecords";

type Props = {
  initialRecords: BloodPressureRecord[];
};

const Records = ({ initialRecords }: Props) => {
  const user = useUser();
  const { data: records } = useRecords(user.id, { initialRecords });

  return (
    <div className="rounded border border-grey-200">
      {/* Note: `border-radius` does not apply to table elements when `border-collapse` is `collapse` (which is Tailwind's reset). Therefore, wrapping the table with a bordered div.*/}
      <table className="divide-y divide-grey-200">
        <thead>
          <tr className="text-sm text-grey-500">
            <th className="px-4 py-3 text-left font-medium uppercase">Time</th>
            <th className="px-4 py-3 text-right font-medium uppercase">Sys</th>
            <th className="px-4 py-3 text-right font-medium uppercase">Dia</th>
            <th className="px-4 py-3 text-right font-medium uppercase">
              Pulse
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grey-200">
          {(records ?? []).map(({ id, sys, dia, pulse, created_at }) => {
            return (
              <tr className="cursor-pointer hover:bg-grey-50" key={id}>
                <td className="px-4 py-3 font-light tabular-nums text-grey-600">
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
  );
};

export { Records };
