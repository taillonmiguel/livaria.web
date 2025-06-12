"use client"

import { FaSearch } from "react-icons/fa"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar..." }: SearchBarProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        aria-label="Search"
      />
      {value && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}
