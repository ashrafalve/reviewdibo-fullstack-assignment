from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.product_service import ProductService
from app.schemas.schemas import ProductResponse, ProductDetailResponse, ErrorResponse

router = APIRouter()


@router.get("/products", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.get_products()


@router.get("/products/{product_id}", response_model=ProductDetailResponse, responses={404: {"model": ErrorResponse}})
def get_product(product_id: int, db: Session = Depends(get_db)):
    service = ProductService(db)
    product = service.get_product_by_id(product_id)
    if not product:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")
    return product
