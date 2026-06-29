from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.review_service import ReviewService
from app.schemas.schemas import ReviewCreate, ReviewUpdate, ReviewResponse, ErrorResponse

router = APIRouter(tags=["Reviews"])


@router.post(
    "/reviews",
    response_model=ReviewResponse,
    status_code=201,
    summary="Create a review",
    description="Create a new review for a product. If the user email already exists, the existing user is linked. Returns 400 if the product is not found or the user has already reviewed it.",
    response_description="The created review.",
    responses={400: {"model": ErrorResponse}},
)
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


@router.put(
    "/reviews/{review_id}",
    response_model=ReviewResponse,
    summary="Update a review",
    description="Update an existing review by ID. Partial updates are supported. If user email is provided, the review will be reassigned to that user.",
    response_description="The updated review.",
    responses={404: {"model": ErrorResponse}, 400: {"model": ErrorResponse}},
)
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


@router.delete(
    "/reviews/{review_id}",
    status_code=204,
    summary="Delete a review",
    description="Permanently delete a review by ID. Returns 204 on success or 404 if the review does not exist.",
    response_description="No content returned.",
    responses={404: {"model": ErrorResponse}},
)
def delete_review(review_id: int, db: Session = Depends(get_db)):
    service = ReviewService(db)
    result = service.delete_review(review_id)
    if not result:
        raise HTTPException(status_code=404, detail="Review not found")
    return None
