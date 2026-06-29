"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") ?? "";
  const initialRating = searchParams?.get("min_rating") ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [rating, setRating] = useState(initialRating);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (newSearch: string, newRating: string) => {
      const params = new URLSearchParams();
      if (newSearch) params.set("search", newSearch);
      if (newRating) params.set("min_rating", newRating);
      const query = params.toString();
      router.push(query ? `/?${query}` : "/");
    },
    [router],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      updateUrl(value, rating);
    }, 300);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
    updateUrl(search, value);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const hasFilters = initialSearch || initialRating;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative sm:w-72">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <select
        value={rating}
        onChange={(e) => handleRatingChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">All Ratings</option>
        <option value="4">4+</option>
        <option value="3">3+</option>
        <option value="2">2+</option>
        <option value="1">1+</option>
      </select>
      {hasFilters && (
        <button
          onClick={() => {
            setSearch("");
            setRating("");
            router.push("/");
          }}
          className="text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          Clear
        </button>
      )}
    </div>
  );
}
