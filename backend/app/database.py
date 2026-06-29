from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import settings

# Render (and many providers) supply a DATABASE_URL with the `postgresql://` or
# `postgresql+psycopg2://` scheme.  We only have psycopg v3 installed, so we
# must rewrite the scheme to `postgresql+psycopg` before handing it to
# SQLAlchemy – otherwise SQLAlchemy tries to import the missing `psycopg2`.
_db_url = settings.database_url
if _db_url.startswith("postgresql+psycopg2://"):
    _db_url = _db_url.replace("postgresql+psycopg2://", "postgresql+psycopg://", 1)
elif _db_url.startswith("postgresql://"):
    _db_url = _db_url.replace("postgresql://", "postgresql+psycopg://", 1)
elif _db_url.startswith("postgres://"):
    # Heroku / old-style shorthand
    _db_url = _db_url.replace("postgres://", "postgresql+psycopg://", 1)

engine = create_engine(
    _db_url,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=3600,
    pool_timeout=30,
    echo=settings.environment == "development",
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
