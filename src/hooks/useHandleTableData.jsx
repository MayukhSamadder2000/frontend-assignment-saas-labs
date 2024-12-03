import { useState } from "react";
import { NUMBER_REGEX } from "../constants/regex";

export function useHandleTableData({ data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(page);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (NUMBER_REGEX.test(value)) {
      setInputPage(value ? Number(value) : "");
    }
  };

  const handleInputBlur = () => {
    if (inputPage < 1 || inputPage > totalPages || inputPage === "") {
      setInputPage(currentPage);
    } else {
      handlePageChange(inputPage);
    }
  };

  return {
    currentData,
    totalPages,
    handleInputChange,
    handleInputBlur,
    currentPage,
    inputPage,
    handlePageChange,
  };
}
