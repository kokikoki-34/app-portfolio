import { Table, TableRow } from "../../shared/components/table";
import { useGetHealth } from "./api/generated/default/default";

export function HealthView() {
  const { data, isLoading, isError, error } = useGetHealth();

  if (isLoading)
    return (
      <div className="text-foreground-muted">Checking system status...</div>
    );
  if (isError) throw error;

  return (
    <Table>
      <TableRow label="Status">
        <div className="flex items-center justify-end gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground-accent" />
          <span className="uppercase tracking-wider">{data?.data?.status}</span>
        </div>
      </TableRow>
      <TableRow label="Server Time">
        <div className="flex items-center justify-end gap-2">
          {data?.data?.currentTime}
        </div>
      </TableRow>
    </Table>
  );
}
