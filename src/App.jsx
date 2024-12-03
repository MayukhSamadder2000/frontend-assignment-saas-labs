import PaginatedTable from "./components/PaginatedTable/PaginatedTable";
import { useGetTableData } from "./hooks/useGetTableData";

export default function App() {
  const { data, loading } = useGetTableData(
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
  );

  return (
    <div className="app">
      <PaginatedTable data={data} itemsPerPage={5} loading={loading} />
    </div>
  );
}
