interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block text-lg leading-none" aria-hidden="true">
            <span className={`${filled ? "text-amber-400" : "text-gray-300"}`}>★</span>
            {halfFilled && (
              <span className="absolute inset-0 overflow-hidden text-amber-400" style={{ width: "50%" }}>
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
