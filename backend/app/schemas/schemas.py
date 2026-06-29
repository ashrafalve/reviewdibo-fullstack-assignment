from pydantic import BaseModel, Field, EmailStr


class ReviewBase(BaseModel):
    rating: int = Field(ge=1, le=5, examples=[5])
    comment: str = Field(examples=["Great product, highly recommended!"])


class ReviewCreate(ReviewBase):
    user_name: str = Field(examples=["John Doe"])
    user_email: EmailStr = Field(examples=["john@example.com"])
    product_id: int = Field(examples=[1])


class ReviewUpdate(BaseModel):
    rating: int | None = Field(default=None, ge=1, le=5, examples=[4])
    comment: str | None = Field(default=None, examples=["Updated review text"])
    user_name: str | None = Field(default=None, examples=["John Doe"])
    user_email: EmailStr | None = Field(default=None, examples=["john@example.com"])


class ReviewResponse(ReviewBase):
    id: int = Field(examples=[1])
    user_name: str = Field(examples=["John Doe"])
    product_id: int = Field(examples=[1])
    created_at: str = Field(examples=["2026-06-29T10:00:00"])

    model_config = {"from_attributes": True}


class ProductResponse(BaseModel):
    id: int = Field(examples=[1])
    title: str = Field(examples=["Wireless Noise-Cancelling Headphones"])
    description: str = Field(examples=["Premium over-ear headphones with active noise cancellation..."])
    image_url: str | None = Field(examples=["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500"], default=None)
    average_rating: float | None = Field(examples=[4.5], default=None)
    review_count: int = Field(examples=[12])


class ProductDetailResponse(ProductResponse):
    reviews: list[ReviewResponse] = Field(examples=[[]], default=[])


class ErrorResponse(BaseModel):
    detail: str = Field(examples=["Product not found"])
