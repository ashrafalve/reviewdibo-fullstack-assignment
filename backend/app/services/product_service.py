from typing import Any
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from app.models import Product, Review


class ProductService:
    def __init__(self, db: Session):
        self.db = db

    def _annotate(self, products: list[Product]) -> list[dict[str, Any]]:
        product_ids = [p.id for p in products]
        if not product_ids:
            return []
        stats = (
            self.db.query(Review.product_id, func.avg(Review.rating), func.count(Review.id))
            .filter(Review.product_id.in_(product_ids))
            .group_by(Review.product_id)
            .all()
        )
        avg_map = {pid: round(float(avg), 2) if avg else None for pid, avg, _ in stats}
        count_map = {pid: count for pid, _, count in stats}
        return [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "image_url": p.image_url,
                "average_rating": avg_map.get(p.id),
                "review_count": count_map.get(p.id, 0),
            }
            for p in products
        ]

    def get_products(self) -> list[dict[str, Any]]:
        products = self.db.query(Product).all()
        return self._annotate(products)

    def search_products(self, query: str) -> list[dict[str, Any]]:
        products = self.db.query(Product).filter(Product.title.ilike(f"%{query}%")).all()
        return self._annotate(products)

    def filter_by_rating(self, min_rating: int) -> list[dict[str, Any]]:
        subq = (
            select(Review.product_id)
            .group_by(Review.product_id)
            .having(func.avg(Review.rating) >= min_rating)
            .subquery()
        )
        products = self.db.query(Product).join(subq, Product.id == subq.c.product_id).all()
        return self._annotate(products)

    def get_product_by_id(self, product_id: int) -> dict[str, Any] | None:
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return None
        reviews = self.db.query(Review).filter(Review.product_id == product_id).all()
        review_responses = [
            {
                "id": r.id,
                "rating": r.rating,
                "comment": r.comment,
                "created_at": r.created_at.isoformat(),
                "user_name": r.user.name,
                "product_id": r.product_id,
            }
            for r in reviews
        ]
        avg_rating = self.db.query(func.avg(Review.rating)).filter(Review.product_id == product.id).scalar()
        return {
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "image_url": product.image_url,
            "average_rating": round(float(avg_rating), 2) if avg_rating else None,
            "review_count": len(reviews),
            "reviews": review_responses,
        }
