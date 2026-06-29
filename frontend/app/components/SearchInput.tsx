"use client";

import Link from "next/link";

interface SearchInputProps {
  initialValue: string;
  initialMinRating?: string;
}

export function SearchInput({ initialValue, initialMinRating = "" }: SearchInputProps) {
  return (
    <form action="/" method="get" className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="text"
        name="search"
        defaultValue={initialValue}
        placeholder="Search by title..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-80"
      />
      <select
        name="min_rating"
        defaultValue={initialMinRating}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">All Ratings</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
        <option value="2">2+</option>
        <option value="1">1+</option>
      </select>
      {(initialValue || initialMinRating) && (
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear filters
        </Link>
      )}
    </form>
  );
}
