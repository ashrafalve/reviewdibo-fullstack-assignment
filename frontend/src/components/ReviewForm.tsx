"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import type { Review } from "@/types";

interface ReviewFormInputs {
  user_name: string;
  user_email: string;
  rating: number;
  comment: string;
}

interface ReviewFormProps {
  productId: number;
  onSuccess: (review: Review) => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormInputs>({
    defaultValues: {
      rating: 0,
    },
  });

  const watchedRating = watch("rating");

  const handleStarClick = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  const onSubmit = async (data: ReviewFormInputs) => {
    setLoading(true);
    setServerError(null);
    setSuccess(false);
    try {
      const { data: review } = await api.post<Review>("/reviews", {
        user_name: data.user_name,
        user_email: data.user_email,
        product_id: productId,
        rating: data.rating,
        comment: data.comment,
      });
      reset();
      setSuccess(true);
      onSuccess(review);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border border-gray-200 bg-white p-6">
      <h3 className="mb-5 text-base font-semibold text-gray-900">Write a review</h3>
      {success && (
        <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          Review submitted successfully!
        </div>
      )}
      {serverError && <p className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{serverError}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="user_name" className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
          <input
            id="user_name"
            type="text"
            {...register("user_name", { required: "Name is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Your name"
          />
          {errors.user_name && <p className="mt-1 text-xs text-red-600">{errors.user_name.message}</p>}
        </div>
        <div>
          <label htmlFor="user_email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
          <input
            id="user_email"
            type="email"
            {...register("user_email", {
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="your@email.com"
          />
          {errors.user_email && <p className="mt-1 text-xs text-red-600">{errors.user_email.message}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Rating</label>
        <input type="hidden" {...register("rating", { required: "Rating is required", min: { value: 1, message: "Minimum rating is 1" }, max: { value: 5, message: "Maximum rating is 5" } })} />
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => handleStarClick(star)} aria-label={`Rate ${star} star${star === 1 ? '' : 's'}`} className="p-1 text-2xl transition">
              <span className={star <= watchedRating ? "text-amber-400" : "text-gray-300"}>★</span>
            </button>
          ))}
          {errors.rating && <span className="ml-2 text-xs text-red-600">{errors.rating.message}</span>}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-gray-700">Review</label>
        <textarea
          id="comment"
          rows={4}
          {...register("comment", { required: "Review is required", minLength: { value: 10, message: "Review must be at least 10 characters" } })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Share your experience..."
        />
        {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
