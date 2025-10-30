from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'seaweed_swimmer_2')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class LeaderboardEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    score: int
    achievement: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @validator('username')
    def validate_username(cls, v):
        if not v or len(v) < 3 or len(v) > 15:
            raise ValueError('Username must be between 3 and 15 characters')
        if not re.match(r'^[a-zA-Z0-9 ]+$', v):
            raise ValueError('Username can only contain alphanumeric characters and spaces')
        return v.strip()

    @validator('score')
    def validate_score(cls, v):
        if v < 0:
            raise ValueError('Score must be non-negative')
        return v

class LeaderboardSubmit(BaseModel):
    username: str
    score: int
    achievement: str

class UsernameCheck(BaseModel):
    username: str
    available: bool


# Helper function to determine achievement
def get_achievement(score: int) -> str:
    if score >= 1000:
        return '👑 Ocean Deity'
    elif score >= 700:
        return '🌌 Abyssal Master'
    elif score >= 500:
        return '🌟 Legendary Swimmer'
    elif score >= 300:
        return '🐠 Fish Whisperer'
    elif score >= 200:
        return '⭐ Deep Sea Explorer'
    elif score >= 100:
        return '🥇 Gold Swimmer'
    elif score >= 50:
        return '🥈 Silver Swimmer'
    elif score >= 20:
        return '🥉 Bronze Swimmer'
    else:
        return '🐟 Novice Swimmer'


# Routes
@api_router.get("/")
async def root():
    return {"message": "Seaweed Swimmer 2 API", "version": "1.0"}


@api_router.post("/leaderboard/submit", response_model=LeaderboardEntry)
async def submit_score(input: LeaderboardSubmit):
    """
    Submit a score to the global leaderboard.
    Username must be unique.
    """
    try:
        # Check if username already exists
        existing = await db.leaderboard.find_one({"username": input.username})
        
        if existing:
            # Username exists - update only if new score is higher
            if input.score > existing.get('score', 0):
                # Update with higher score
                entry = LeaderboardEntry(
                    id=existing.get('id', str(uuid.uuid4())),
                    username=input.username,
                    score=input.score,
                    achievement=input.achievement
                )
                
                await db.leaderboard.update_one(
                    {"username": input.username},
                    {"$set": entry.dict()}
                )
                return entry
            else:
                # Return existing entry if new score is not higher
                return LeaderboardEntry(**existing)
        else:
            # New username - create entry
            entry = LeaderboardEntry(
                username=input.username,
                score=input.score,
                achievement=input.achievement
            )
            
            await db.leaderboard.insert_one(entry.dict())
            return entry
            
    except Exception as e:
        logger.error(f"Error submitting score: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/leaderboard/global", response_model=List[LeaderboardEntry])
async def get_global_leaderboard(limit: int = 100):
    """
    Get top scores from the global leaderboard.
    Returns top 100 by default.
    """
    try:
        entries = await db.leaderboard.find().sort("score", -1).limit(limit).to_list(limit)
        return [LeaderboardEntry(**entry) for entry in entries]
    except Exception as e:
        logger.error(f"Error fetching leaderboard: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/leaderboard/check-username", response_model=UsernameCheck)
async def check_username(username: str):
    """
    Check if a username is available.
    """
    try:
        # Validate username format
        if not username or len(username) < 3 or len(username) > 15:
            raise HTTPException(status_code=400, detail="Username must be between 3 and 15 characters")
        
        if not re.match(r'^[a-zA-Z0-9 ]+$', username):
            raise HTTPException(status_code=400, detail="Username can only contain alphanumeric characters and spaces")
        
        existing = await db.leaderboard.find_one({"username": username.strip()})
        return UsernameCheck(username=username, available=existing is None)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error checking username: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/leaderboard/rank/{username}")
async def get_user_rank(username: str):
    """
    Get a user's rank on the leaderboard.
    """
    try:
        # Get user's entry
        user_entry = await db.leaderboard.find_one({"username": username})
        if not user_entry:
            raise HTTPException(status_code=404, detail="Username not found")
        
        # Count how many entries have higher scores
        rank = await db.leaderboard.count_documents({"score": {"$gt": user_entry['score']}})
        
        return {
            "username": username,
            "rank": rank + 1,
            "score": user_entry['score'],
            "achievement": user_entry['achievement']
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting rank: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
