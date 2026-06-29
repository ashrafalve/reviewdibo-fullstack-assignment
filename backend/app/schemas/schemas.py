from pydantic import BaseModel, Field, EmailStr


class ReviewBase(BaseModel):
    rating: int = Field(ge=1, le=5)
    comment: str


class ReviewCreate(ReviewBase):
    user_name: str
    user_email: EmailStr
    product_id: int


class ReviewUpdate(BaseModel):
    rating: int | None = Field(default=None, ge=1, le=5)
    comment: str | None = None
    user_name: str | None = None
    user_email: EmailStr | None = None


class ReviewResponse(ReviewBase):
    id: int
    user_name: str
    product_id: int
    created_at: str

    model_config = {"from_attributes": True}


class ProductResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: str | None
    average_rating: float | None
    review_count: int


class ProductDetailResponse(ProductResponse):
    reviews: list[ReviewResponse] = []


class ErrorResponse(BaseModel):
    detail: str
