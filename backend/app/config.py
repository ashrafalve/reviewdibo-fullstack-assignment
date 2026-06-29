from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="forbid")

    database_url: str
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    environment: str = "development"
    # Comma-separated list of allowed CORS origins, e.g.:
    # CORS_ORIGINS=https://my-app.vercel.app,http://localhost:3000
    cors_origins: List[str] = ["http://localhost:3000", "http://localhost:3001"]


settings = Settings()
