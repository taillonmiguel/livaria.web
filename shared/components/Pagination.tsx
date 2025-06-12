"use client"

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      <div className="flex space-x-2">
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`
                flex items-center justify-center w-10 h-10 border rounded-lg transition-colors
                ${
                  currentPage === page
                    ? "bg-primary-500 text-white border-primary-500"
                    : "border-gray-300 hover:bg-gray-50"
                }
              `}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="flex items-center justify-center w-10 h-10 text-gray-500">
              {page}
            </span>
          ),
        )}
      </div>

      <button
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  )
}
