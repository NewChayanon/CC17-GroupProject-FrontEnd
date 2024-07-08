/* eslint-disable react/prop-types */
export default function StoreList({ stores, toggleBlock, sortStores }) {
  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => sortStores("name")}
            >
              Store Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-center"
              onClick={() => sortStores("storeId")}
            >
              Store ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-center"
              onClick={() => sortStores("userId")}
            >
              User ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{store.name}</div>
                <div className="text-sm text-gray-500">{store.email}</div>
                <div className="text-xs text-gray-400">Last updated: {store.lastUpdated}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{store.storeId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{store.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center min-w-[105px]">
                <button
                  className={`text-sm font-medium ${store.blocked ? "text-red-600" : "text-green-600"}`}
                  onClick={() => toggleBlock(store.id)}
                >
                  {store.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
