from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.review_service import ReviewService
from app.schemas.schemas import ReviewCreate, ReviewUpdate, ReviewResponse, ErrorResponse

router = APIRouter()


@router.post("/reviews", response_model=ReviewResponse, status_code=201, responses={400: {"model": ErrorResponse}})
def create_review(data: ReviewCreate, db: Session = Depends(get_db)):
    service = ReviewService(db)
    try:
        review = service.create_review(data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {
        "id": review.id,
        "rating": review.rating,
        "comment": review.comment,
        "created_at": review.created_at.isoformat(),
        "user_name": review.user.name,
        "product_id": review.product_id,
    }


@router.put("/reviews/{review_id}", response_model=ReviewResponse, responses={404: {"model": ErrorResponse}, 400: {"model": ErrorResponse}})
def update_review(review_id: int, data: ReviewUpdate, db: Session = Depends(get_db)):
    service = ReviewService(db)
    try:
        review = service.update_review(review_id, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return {
        "id": review.id,
        "rating": review.rating,
        "comment": review.comment,
        "created_at": review.created_at.isoformat(),
        "user_name": review.user.name,
        "product_id": review.product_id,
    }


@router.delete("/reviews/{review_id}", status_code=204, responses={404: {"model": ErrorResponse}})
def delete_review(review_id: int, db: Session = Depends(get_db)):
    service = ReviewService(db)
    result = service.delete_review(review_id)
    if not result:
        raise HTTPException(status_code=404, detail="Review not found")
    return None
