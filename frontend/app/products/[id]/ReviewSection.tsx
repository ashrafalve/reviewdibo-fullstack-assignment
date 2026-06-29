"use client";

import { useRouter } from "next/navigation";
import { ReviewForm } from "@/components/ReviewForm";
import { StarRating } from "@/components/StarRating";
import type { Review } from "@/types";

interface ReviewSectionProps {
  productId: number;
  reviews: Review[];
}

export function ReviewSection({ productId, reviews }: ReviewSectionProps) {
  const router = useRouter();

  return (
    <>
      <ReviewForm productId={productId} onSuccess={() => router.refresh()} />
      <div className="mt-8 space-y-3">
        {reviews.length === 0 && <p className="text-sm text-gray-400">No reviews yet. Be the first to review!</p>}
        {reviews.map((review) => (
          <div key={review.id} className="rounded-md border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{review.user_name}</span>
              <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
            <div className="mt-1.5">
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
