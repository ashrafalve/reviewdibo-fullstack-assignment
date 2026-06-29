export interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  average_rating: number | null;
  review_count: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
  product_id: number;
}

export interface ProductDetail extends Product {
  reviews: Review[];
}

export interface ReviewCreate {
  user_name: string;
  user_email: string;
  product_id: number;
  rating: number;
  comment: string;
}

export interface ReviewUpdate {
  rating?: number;
  comment?: string;
  user_name?: string;
  user_email?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}
