import { useGetHealth } from "./api/generated/default/default";

export function HealthView() {
  const { data, isLoading, isError } = useGetHealth();

  if (isLoading) return <div>Checking server...</div>;
  if (isError) return <div>Server is unreachable.</div>;

  return (
    <div>
      <p>System Status: {data?.data?.status}</p>
      <p>Time: {data?.data?.current_time}</p>
    </div>
  );
}
