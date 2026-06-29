interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block text-lg leading-none">
            <span className={`${filled ? "text-yellow-400" : "text-gray-300"}`}>★</span>
            {halfFilled && (
              <span className="absolute inset-0 overflow-hidden text-yellow-400" style={{ width: "50%" }}>
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
