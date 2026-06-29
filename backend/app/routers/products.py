from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.product_service import ProductService
from app.schemas.schemas import ProductResponse, ProductDetailResponse, ErrorResponse

router = APIRouter(tags=["Products"])


@router.get(
    "/products",
    response_model=list[ProductResponse],
    summary="List all products",
    description="Retrieve all products with their average rating and total review count. Optional `search` query filters by title and `min_rating` filters by minimum average rating.",
    response_description="A list of products.",
)
def get_products(
    search: str = Query(default=None, description="Search products by title"),
    min_rating: int = Query(default=None, ge=1, le=5, description="Filter products by minimum average rating"),
    db: Session = Depends(get_db),
):
    service = ProductService(db)
    if search and search.strip():
        products = service.search_products(search.strip())
    else:
        products = service.get_products()
    if min_rating:
        products = service.filter_by_rating(min_rating)
    return products


@router.get(
    "/products/{product_id}",
    response_model=ProductDetailResponse,
    summary="Get product details",
    description="Retrieve a product by ID including all associated reviews and reviewer names.",
    response_description="Product details with reviews.",
    responses={404: {"model": ErrorResponse}},
)
def get_product(product_id: int, db: Session = Depends(get_db)):
    service = ProductService(db)
    product = service.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
