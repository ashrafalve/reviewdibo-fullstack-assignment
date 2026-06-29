import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "./components/SearchInput";

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

async function getProducts(search?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  const url = search ? `${baseUrl}/products?search=${encodeURIComponent(search)}` : `${baseUrl}/products`;
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error("Failed to load products");
  }
  return response.json();
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const products = await getProducts(params.search);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Browse Products</h1>
            <p className="text-gray-600">Discover products and read reviews from the community.</p>
          </div>
          <Suspense fallback={<div className="h-10 w-full max-w-md rounded-lg border border-gray-200 bg-gray-100" />}>
            <SearchInput initialValue={params.search || ""} />
          </Suspense>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  );
}
