from pydantic import BaseModel
class Transaction(BaseModel):
    action: str
    crypto: str
    price: float
    amount: float