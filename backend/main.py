from fastapi import FastAPI, HTTPException
from models.Transaction import Transaction
from models.User import User
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from db import (
    fetch_all_transactions,
    insert_transaction,
    update_transaction,
    remove_transaction,
    fetch_all_transactions_for_user
)
app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = ['petar', 'tanja', 'didi']

table = {
    'petar' : {
        'name':'petar',
        'transactions': [
            {
                "id":1,
                "action": "BUY",
                "crypto": "BTC",
                "price": 21836.56,
                "amount": 0.003
            },
            {
                "id":2,
                "action": "BUY",
                "crypto": "ETH",
                "price": 1758.42,
                "amount": 0.085
            }
        ]
    },
    'tanja' : {
        'name':'tanja',
        'transactions': [
            {
                'id':1,
                'action':'BUY',
                'crypto':'BTC',
                'price':21836.56,
                'amount':0.003
            },
            {
                'id':2,
                'action':'BUY',
                'crypto':'ETH',
                'price':1758.42,
                'amount':0.085
            }
        ]
    },
    'didi' : {
        'name':'didi',
        'transactions': [
            {
                'id':1,
                'action':'BUY',
                'crypto':'BTC',
                'price':21836.56,
                'amount':0.003
            },
            {
                'id':2,
                'action':'BUY',
                'crypto':'ETH',
                'price':1758.42,
                'amount':0.085
            },
            {
                'id':3,
                'action':'SELL',
                'crypto':'ETH',
                'price':1612.21,
                'amount':0.1
            }
        ]
    }
}
'''
table = [
    {
        'name':'petar',
        'transactions':{
            1:{
                'action':'BUY',
                'crypto':'BTC',
                'price':21836.56,
                'amount':0.003
            },
            2:{
                'action':'BUY',
                'crypto':'ETH',
                'price':1758.42,
                'amount':0.085
            }
        }
    },
    {
        'name':'tanja',
        'transactions':{
            1:{
                'action':'BUY',
                'crypto':'BTC',
                'price':21836.56,
                'amount':0.003
            },
            2:{
                'action':'BUY',
                'crypto':'ETH',
                'price':1758.42,
                'amount':0.085
            }
        }
    },
    {
        'name':'didi',
        'transactions':{
            1:{
                'action':'BUY',
                'crypto':'BTC',
                'price':21836.56,
                'amount':0.003
            },
            2:{
                'action':'BUY',
                'crypto':'ETH',
                'price':1758.42,
                'amount':0.085
            },
            3:{
                'action':'SELL',
                'crypto':'ETH',
                'price':1612.21,
                'amount':0.1
            }
        }
    }
]

table = {
    'petar':{
        'transactions':{
            1:{
                'action':'BUY',
                'crypto':'BTC',
                'price':21836.56,
                'amount':0.003
            },
            2:{
                'action':'BUY',
                'crypto':'ETH',
                'price':1758.42,
                'amount':0.085
            }
        }
    },
    'tanja':{
        1:{
            'action':'BUY',
            'crypto':'BTC',
            'price':21836.56,
            'amount':0.003
        },
        2:{
            'action':'BUY',
            'crypto':'ETH',
            'price':1758.42,
            'amount':0.085
        }
    },
    'didi':{
        1:{
            'action':'BUY',
            'crypto':'BTC',
            'price':21836.56,
            'amount':0.003
        },
        2:{
            'action':'BUY',
            'crypto':'ETH',
            'price':1758.42,
            'amount':0.085
        },
        3:{
            'action':'SELL',
            'crypto':'ETH',
            'price':1612.21,
            'amount':0.1
        }
    }
}'''

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

@app.get('/api/user/{username}/transactions/{transaction_id}')
def get_transaction(username: str, transaction_id: int):
    try:
        data = table[username][transaction_id]
        return table[username][transaction_id]
    except:
        print("Invalid user or transaction id")



@app.post('/api/user/{username}/transactions')
async def post_transaction(username: str, transaction: Transaction):
    try:
        response =  await insert_transaction(username=username, transaction=transaction)
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
