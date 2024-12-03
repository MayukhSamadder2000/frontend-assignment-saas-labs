import { useHandleTableData } from "../../hooks/usehandleTableData";

const PaginatedTable = ({ data = [], itemsPerPage, loading = true }) => {
  const {
    currentData,
    handleInputBlur,
    currentPage,
    handleInputChange,
    totalPages,
    handlePageChange,
    inputPage,
  } = useHandleTableData({ data, itemsPerPage });

  return (
    <div className="paginated-table">
      <table className="paginated-table__table">
        <thead className="paginated-table__header">
          <tr>
            <th className="paginated-table__header-cell">S.No</th>
            <th className="paginated-table__header-cell">Percentage Funded</th>
            <th className="paginated-table__header-cell">Amount Pleged</th>
          </tr>
        </thead>
        <tbody className="paginated-table__body">
          {currentData.map((item) => (
            <tr key={item.id} className="paginated-table__row">
              <td className="paginated-table__cell">{item["s.no"]}</td>
              <td className="paginated-table__cell">
                {item["percentage.funded"]}
              </td>
              <td className="paginated-table__cell">{item["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && (
        <div className="paginated-table__pagination">
          <button
            className="paginated-table__button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="paginated-table__page-input">
            Page{" "}
            <input
              type="text"
              className="paginated-table__input"
              value={inputPage}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />{" "}
            of {totalPages}
          </div>
          <button
            className="paginated-table__button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;
