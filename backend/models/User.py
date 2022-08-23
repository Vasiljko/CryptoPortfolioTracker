from typing import List, Union
from pydantic import BaseModel
from models.Transaction import Transaction

class User(BaseModel):
    username: str
    transactions: List[Transaction]

    class Config:
        arbitrary_types_allowed = True