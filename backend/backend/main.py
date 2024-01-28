from typing import Dict, List, Union

from fastapi import FastAPI

from fastapi.logger import logger
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import logging

logger = logging.getLogger("main")
logging.basicConfig(level=logging.DEBUG)
# steam_handler = logging.FileHandler('info.log', mode='w')
# steam_handler = logging.StreamHandler()
# logger.addHandler(steam_handler)


origins = ["*"]
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = FastAPI(middleware=middleware)


@app.get("/")
def read_root():
    return {"Hello": "World"}


class Card(BaseModel):
    id: int
    direction: int


@app.post("/answer")
async def answer(cards: List[Card]):
    logger.info(cards)

    answer: str = ""
    for card in cards:
        answer = answer + f"{card.id},"
    answer = answer[0:-1] + " 카드 뽑아서 운 좋다고 하네여!"
    return {"question": "그렇군요!!", "answer": answer}
