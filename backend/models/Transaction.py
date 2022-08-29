from pydantic import BaseModel, validator
from datetime import date, datetime, time, timedelta

class Transaction(BaseModel):
    action: str
    crypto: str
    price: float
    amount: float
    datetime: str = None

