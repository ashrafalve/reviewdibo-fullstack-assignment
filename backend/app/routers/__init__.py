from fastapi import APIRouter
from app.routers import products, reviews

api_router = APIRouter()
api_router.include_router(products.router)
api_router.include_router(reviews.router)
