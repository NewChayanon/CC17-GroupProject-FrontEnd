import PropTypes from "prop-types";
import { useState } from "react";

export default function StoreList({ stores, columns, actions, initialSortConfig }) {
  const [sortConfig, setSortConfig] = useState(initialSortConfig);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedStores = [...stores].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const renderCell = (store, column) => {
    const dateTime = new Date(store.updatedAt).toLocaleString("en-GB")
    if (column.key === "username" || column.key === "storeName") {
      return (
        <div>
          <div className="text-sm font-medium text-gray-900">{store.username}</div>
          <div className="text-sm text-gray-500">{store.email}</div>
          <div className="text-xs text-gray-400">Last updated: {dateTime}</div>
        </div>
      );
    }
    if (column.render) {
      return column.render(store[column.key], store);
    }
    return store[column.key];
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left min-w-32 ${
                  column.sortable ? "cursor-pointer" : ""
                } ${column.className}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {column.sortable && (
                  <span>
                    {sortConfig.key === column.key
                      ? sortConfig.direction === "asc"
                        ? " ↓"
                        : " ↑"
                      : ""}
                  </span>
                )}
              </th>
            ))}
            {actions.length > 0 && (
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedStores.map((store) => (
            <tr key={store.id}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap ${column.key === "username" ? "text-left" : column.key === "topic" ? "text-left overflow-hidden text-ellipsis max-w-44" : column.key === "storeName" ? "text-left" : "text-center"}`}

                  
                >
                  {renderCell(store, column)}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-center min-w-28">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      className={`text-sm font-medium ${action.className(store)}`}
                      onClick={() => action.onClick(store.id)}
                    >
                      {action.label(store)}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

StoreList.propTypes = {
  stores: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      className: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.func,
    })
  ),
  initialSortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["asc", "desc"]).isRequired,
  }),
};

StoreList.defaultProps = {
  actions: [],
  initialSortConfig: { key: "", direction: "asc" },
};
