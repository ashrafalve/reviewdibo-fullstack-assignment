import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { StarRating } from "@/components/StarRating";

interface ProductCardProps {
  product: Product;
  href: string;
  priority?: boolean;
}

export function ProductCard({ product, href, priority = false }: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        {(!product.image_url) && (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {product.average_rating !== null && product.average_rating > 0 ? (
              <div className="flex items-center gap-2">
                <StarRating rating={product.average_rating} />
                <span className="text-sm font-medium text-gray-900">{product.average_rating.toFixed(1)}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">No ratings yet</span>
            )}
            <span className="text-xs text-gray-400">{product.review_count} review{product.review_count === 1 ? '' : 's'}</span>
          </div>
          <Link
            href={href}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
