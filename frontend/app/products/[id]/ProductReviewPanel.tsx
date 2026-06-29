"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReviewForm } from "@/components/ReviewForm";
import { StarRating } from "@/components/StarRating";
import type { Review } from "@/types";

interface ProductReviewPanelProps {
  productId: number;
  initialReviews: Review[];
  initialAverageRating: number | null;
  initialReviewCount: number;
}

function computeAverageRating(
  currentAverage: number | null,
  currentCount: number,
  newRating: number,
): number {
  if (currentCount === 0 || currentAverage === null || currentAverage === 0) {
    return newRating;
  }
  return (currentAverage * currentCount + newRating) / (currentCount + 1);
}

export function ProductReviewPanel({
  productId,
  initialReviews,
  initialAverageRating,
  initialReviewCount,
}: ProductReviewPanelProps) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const [reviewCount, setReviewCount] = useState(initialReviewCount);

  useEffect(() => {
    setReviews(initialReviews);
    setAverageRating(initialAverageRating);
    setReviewCount(initialReviewCount);
  }, [initialReviews, initialAverageRating, initialReviewCount]);

  const handleReviewAdded = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
    setReviewCount((prev) => {
      setAverageRating((currentAvg) => computeAverageRating(currentAvg, prev, review.rating));
      return prev + 1;
    });
    router.refresh();
  };

  return (
    <>
      <div className="mt-5 flex items-center gap-4">
        {averageRating !== null && averageRating > 0 ? (
          <>
            <StarRating rating={averageRating} />
            <span className="text-sm font-medium text-gray-900">{averageRating.toFixed(1)}</span>
          </>
        ) : (
          <span className="text-sm text-gray-400">No ratings yet</span>
        )}
        <span className="text-sm text-gray-400">
          {reviewCount} review{reviewCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-10">
        <h2 className="text-base font-semibold text-gray-900">Reviews</h2>
        <div className="mt-5">
          <ReviewForm productId={productId} onSuccess={handleReviewAdded} />
          <div className="mt-8 space-y-3">
            {reviews.length === 0 && (
              <p className="text-sm text-gray-400">No reviews yet. Be the first to review!</p>
            )}
            {reviews.map((review) => (
              <div key={review.id} className="rounded-md border border-gray-200 bg-white px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{review.user_name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1.5">
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
