/* eslint-disable react/prop-types */
export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  className = "",
  buttonClassName = "",
  activeButtonClassName = "bg-primary text-white",
  inactiveButtonClassName = "bg-gray-200",
  showFirstLastButtons = false,
  firstLabel = "First",
  lastLabel = "Last",
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={className}>
      <ul className="flex justify-center mt-4 mb-4">
        {showFirstLastButtons && (
          <li className="mx-1">
            <button
              onClick={() => paginate(1)}
              className={`py-2 px-4 border rounded ${buttonClassName}`}
            >
              {firstLabel}
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`py-2 px-4 border rounded ${
                currentPage === number ? activeButtonClassName : inactiveButtonClassName
              } ${buttonClassName}`}
            >
              {number}
            </button>
          </li>
        ))}
        {showFirstLastButtons && (
          <li className="mx-1">
            <button
              onClick={() => paginate(pageNumbers.length)}
              className={`py-2 px-4 border rounded ${buttonClassName}`}
            >
              {lastLabel}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
