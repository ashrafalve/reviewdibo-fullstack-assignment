from datetime import datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Product


def seed_products(db: Session):
    existing = db.query(Product).count()
    if existing > 0:
        db.query(Product).delete()
        db.commit()
        print(f"Cleared {existing} existing products.")

    products = [
        {
            "title": "Wireless Noise-Cancelling Headphones",
            "description": "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio support.",
            "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        },
        {
            "title": "Mechanical Keyboard RGB",
            "description": "Compact 75% mechanical keyboard with hot-swappable switches, PBT keycaps, and per-key RGB backlighting.",
            "image_url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        },
        {
            "title": 'Ultra-Wide 34" Curved Monitor',
            "description": "3440x1440 QHD curved display, 144Hz refresh rate, 1ms response, USB-C with 90W power delivery.",
            "image_url": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        },
        {
            "title": "Ergonomic Wireless Mouse",
            "description": "Vertical ergonomic mouse reducing wrist strain. 4000 DPI, silent clicks, multi-device Bluetooth.",
            "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        },
        {
            "title": "Portable SSD 2TB",
            "description": "Compact, rugged, and fast USB 3.2 Gen 2x2 NVMe SSD. Transfer speeds up to 2000MB/s.",
            "image_url": "https://images.unsplash.com/photo-1562408590-e32931084e23?w=500",
        },
        {
            "title": "Smart Home Speaker",
            "description": "Voice-controlled smart speaker with 360° sound, built-in assistant, and multi-room audio support.",
            "image_url": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        },
        {
            "title": "4K Webcam with Ring Light",
            "description": "Auto-focus 4K webcam with adjustable brightness ring light and dual noise-cancelling microphones.",
            "image_url": "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=500",
        },
        {
            "title": "Laptop Stand Adjustable",
            "description": "Aluminum alloy laptop stand with ergonomic adjustable height. Compatible with 10-17.3 inch laptops.",
            "image_url": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500",
        },
    ]

    for p in products:
        db.add(Product(**p))

    db.commit()


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_products(db)
        print("Seeded 8 demo products successfully.")
    finally:
        db.close()
