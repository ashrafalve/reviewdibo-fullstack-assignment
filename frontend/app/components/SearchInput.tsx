"use client";

import Link from "next/link";

interface SearchInputProps {
  initialValue: string;
}

export function SearchInput({ initialValue }: SearchInputProps) {
  return (
    <form action="/" method="get" className="relative max-w-md">
      <input
        type="text"
        name="search"
        defaultValue={initialValue}
        placeholder="Search by title..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {initialValue && (
        <Link
          href="/"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ×
        </Link>
      )}
    </form>
  );
}
