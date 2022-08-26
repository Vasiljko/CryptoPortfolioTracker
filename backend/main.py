from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from models.Transaction import Transaction
from models.User import User
from typing import List

from db import (
    fetch_all_transactions,
    insert_transaction,
    update_transaction,
    remove_transaction,
    fetch_all_transactions_for_user
)

from crypto_price import fetch_crypto_price

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def get_data():
    response = await fetch_all_transactions()
    return response

@app.get('/api/user/{username}/transactions')
async def get_transactions(username: str):
    response = await fetch_all_transactions_for_user(username)
    if response is not None:
        return response
    else: 
        return []

'''
@app.get('/api/user/{username}/transactions/{transaction_id}')
def get_transaction(username: str, transaction_id: int):
    try:
        data = table[username][transaction_id]
        return table[username][transaction_id]
    except:
        print("Invalid user or transaction id")
'''

@app.get('/api/crypto_price/{crypto_symbol}')
async def get_crypto_price(crypto_symbol: str):
    response = await fetch_crypto_price(crypto_symbol)
    
    if response is not None:
        return response
    else:
        raise HTTPException(404, "Wrong crypto symbol")


@app.post('/api/user/{username}/transactions', response_model=List[Transaction])
async def post_transaction(username: str, transaction: Transaction):
    try:
        response = await insert_transaction(username=username, transaction=transaction)
        return response
    except:
        raise HTTPException(404, "Can't insert transaction")

@app.put('/api/user/{username}/transactions/{transaction_id}')
async def put_transaction(username: str, transaction_id: int, transaction: Transaction):
    try:
        response = await update_transaction(username, transaction_id, transaction)
        return response
    except:
        raise HTTPException(404, "Something went wrong / Bad request")


@app.delete('/api/user/{username}/transactions/{transaction_id}')
async def delete_transaction(username: str, transaction_id: int):
    try:
        response = await remove_transaction(username, transaction_id)
        return response
    except:
        raise HTTPException(404, "Something went wrong / Bad request")

