from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import login, saved
import asyncio
from config import Config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(login.router)
app.include_router(saved.router)
