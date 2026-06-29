from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Product, Review


class ProductService:
    def __init__(self, db: Session):
        self.db = db

    def _annotate(self, products):
        result = []
        for p in products:
            avg_rating = self.db.query(func.avg(Review.rating)).filter(Review.product_id == p.id).scalar()
            review_count = self.db.query(Review).filter(Review.product_id == p.id).count()
            result.append({
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "image_url": p.image_url,
                "average_rating": round(float(avg_rating), 2) if avg_rating else None,
                "review_count": review_count,
            })
        return result

    def get_products(self):
        products = self.db.query(Product).all()
        return self._annotate(products)

    def search_products(self, query: str):
        products = self.db.query(Product).filter(Product.title.ilike(f"%{query}%")).all()
        return self._annotate(products)

    def get_product_by_id(self, product_id: int):
        p = self.db.query(Product).filter(Product.id == product_id).first()
        if not p:
            return None
        reviews = self.db.query(Review).filter(Review.product_id == product_id).all()
        review_responses = []
        for r in reviews:
            review_responses.append({
                "id": r.id,
                "rating": r.rating,
                "comment": r.comment,
                "created_at": r.created_at.isoformat(),
                "user_name": r.user.name,
                "product_id": r.product_id,
            })
        avg_rating = self.db.query(func.avg(Review.rating)).filter(Review.product_id == p.id).scalar()
        return {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "image_url": p.image_url,
            "average_rating": round(float(avg_rating), 2) if avg_rating else None,
            "review_count": len(reviews),
            "reviews": review_responses,
        }
