import SearchBarAdminPage from "./components/SearchBarAdminPage";

export default function RequestedReport() {
  return (
    <div className="flex justify-between p-6 gap-6">
      <div className="w-full h-full bg-yellow-200 flex justify-center ">
        <SearchBarAdminPage placeholder="Search Report List" />
        <div className=""></div>
      </div>
      <div className="w-full h-full bg-green-200">Report List</div>
    </div>
  );
}
