from sqlalchemy.orm import Session
from app.models import User, Product, Review
from app.schemas.schemas import ReviewCreate, ReviewUpdate


class ReviewService:
    def __init__(self, db: Session):
        self.db = db

    def _get_or_create_user(self, user_name: str, user_email: str) -> User:
        user = self.db.query(User).filter(User.email == user_email).first()
        if user:
            return user
        user = User(name=user_name, email=user_email)
        self.db.add(user)
        self.db.flush()
        return user

    def create_review(self, data: ReviewCreate) -> Review:
        product = self.db.query(Product).filter(Product.id == data.product_id).first()
        if not product:
            raise ValueError("Product not found")

        user = self._get_or_create_user(data.user_name, data.user_email)

        existing = (
            self.db.query(Review)
            .filter(Review.user_id == user.id, Review.product_id == data.product_id)
            .first()
        )
        if existing:
            raise ValueError("You have already reviewed this product")

        review = Review(
            product_id=data.product_id,
            user_id=user.id,
            rating=data.rating,
            comment=data.comment,
        )
        self.db.add(review)
        self.db.commit()
        self.db.refresh(review)
        return review

    def update_review(self, review_id: int, data: ReviewUpdate) -> Review | None:
        review = self.db.query(Review).filter(Review.id == review_id).first()
        if not review:
            return None

        if data.user_name and data.user_email:
            user = self.db.query(User).filter(User.email == data.user_email).first()
            if not user:
                user = User(name=data.user_name, email=data.user_email)
                self.db.add(user)
                self.db.flush()
            review.user_id = user.id

        if data.rating is not None:
            review.rating = data.rating
        if data.comment is not None:
            review.comment = data.comment

        self.db.commit()
        self.db.refresh(review)
        return review

    def delete_review(self, review_id: int) -> bool:
        review = self.db.query(Review).filter(Review.id == review_id).first()
        if not review:
            return False
        self.db.delete(review)
        self.db.commit()
        return True
