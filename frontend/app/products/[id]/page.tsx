"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { ProductDetail } from "@/types";
import { StarRating } from "@/components/StarRating";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ReviewForm } from "@/components/ReviewForm";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<ProductDetail>(`/products/${productId}`);
        if (!cancelled) {
          setProduct(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load product");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <ErrorMessage title="Product not found" message={error || "This product does not exist."} />
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-block text-sm text-blue-600 hover:underline">← Back to products</Link>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="relative h-64 w-full bg-gray-100 sm:h-80">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.title} fill className="object-cover" sizes="100vw" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>
          <p className="mt-3 text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center gap-4">
            {product.average_rating !== null && product.average_rating > 0 ? (
              <>
                <StarRating rating={product.average_rating} />
                <span className="font-medium text-gray-900">{product.average_rating.toFixed(1)}</span>
              </>
            ) : (
              <span className="text-gray-500">No ratings yet</span>
            )}
            <span className="text-sm text-gray-500">{product.review_count} review{product.review_count === 1 ? '' : 's'}</span>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Reviews</h2>
        <ReviewForm productId={product.id} onSuccess={() => {
          const fetchProduct = async () => {
            const response = await api.get<ProductDetail>(`/products/${productId}`);
            setProduct(response.data);
          };
          fetchProduct();
        }} />
        <div className="mt-8 space-y-4">
          {product.reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet. Be the first to review!</p>}
          {product.reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{review.user_name}</span>
                <span className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
