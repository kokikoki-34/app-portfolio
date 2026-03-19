import { useGetHealth } from "./api/generated/default/default";

export function HealthView() {
  const { data, isLoading, isError, error } = useGetHealth();

  if (isLoading)
    return <div className="text-muted">Checking system status...</div>;
  if (isError) throw error;

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-slate-100">
            <th className="py-5 text-left">Status</th>
            <td className="py-5">
              <div className="flex items-center justify-end gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="uppercase tracking-wider">
                  {data?.data?.status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="border-b border-slate-100">
            <th className="py-5 text-left">Server Time</th>
            <td className="py-5 text-right">{data?.data?.currentTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
