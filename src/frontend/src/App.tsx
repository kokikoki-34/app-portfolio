import { useGetHealth } from "./func/health/api/generated/default/default";

export default function App() {
  const { data, isLoading, isError } = useGetHealth();

  if (isLoading) return <div>Checking server...</div>;
  if (isError) return <div>Server is unreachable.</div>;

  console.log(data);

  return (
    <div>
      <p>System Status: {data?.data?.status}</p>
      <p>Time: {data?.data?.current_time}</p>
    </div>
  );
}
