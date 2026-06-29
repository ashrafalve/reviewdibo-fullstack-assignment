import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  baseHref?: string;
}

export function ProductGrid({ products, baseHref = "/products" }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} href={`${baseHref}/${product.id}`} />
      ))}
    </div>
  );
}
