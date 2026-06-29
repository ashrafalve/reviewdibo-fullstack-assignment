import Image from "next/image";
import Link from "next/link";
import type { ProductDetail } from "@/types";
import { ProductReviewPanel } from "./ProductReviewPanel";

async function getProduct(id: string): Promise<ProductDetail | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  try {
    const response = await fetch(`${baseUrl}/products/${id}`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-200 bg-white px-8 py-10 text-center">
          <h3 className="text-base font-semibold text-gray-900">Invalid Product</h3>
          <p className="mt-2 text-sm text-gray-500">The product ID is not valid.</p>
          <Link href="/" className="mt-4 inline-block text-sm text-gray-500 transition-colors hover:text-gray-700">Back to products</Link>
        </div>
      </div>
    );
  }

  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-200 bg-white px-8 py-10 text-center">
          <h3 className="text-base font-semibold text-gray-900">Product not found</h3>
          <p className="mt-2 text-sm text-gray-500">This product does not exist.</p>
          <Link href="/" className="mt-4 inline-block text-sm text-gray-500 transition-colors hover:text-gray-700">Back to products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to products
      </Link>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="relative h-64 w-full bg-gray-100 sm:h-80">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">{product.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">{product.description}</p>
          <ProductReviewPanel
            productId={product.id}
            initialReviews={product.reviews}
            initialAverageRating={product.average_rating}
            initialReviewCount={product.review_count}
          />
        </div>
      </div>
    </div>
  );
}
