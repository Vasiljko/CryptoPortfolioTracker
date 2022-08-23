from models.Transaction import Transaction
from models.User import User
from fastapi import HTTPException
import motor.motor_asyncio


client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

db = client.UsersDB

collection = db.Users


async def fetch_all_transactions():
    transactions = []
    res = collection.find({})
    async for document in res:
        transactions.append(User(**document))
    return transactions

async def fetch_all_transactions_for_user(username: str):
    res = await collection.find_one({'username':username})

    if res is None:
        return None

    transactions = res['transactions']

    return transactions

async def insert_transaction(username: str, transaction: Transaction):
    document = await collection.find_one({'username':username})
    if document is not None:
        await collection.update_one({'username':username}, {'$push' : {'transactions':transaction.dict()}})
        return True
    else:
        userObj = User(username=username, transactions=[transaction])
        await collection.insert_one(userObj.dict())
        return True

        
async def update_transaction(username: str, position: int, transaction: Transaction):
    document = await collection.find_one({'username':username})

    if document is not None:
        transactions_list = document['transactions']
        transactions_list[position] = transaction.dict()

        await collection.update_one({'username':username}, {'$set' : {'transactions':transactions_list}})
        return True
    else:
        return False
        
async def remove_transaction(username: str, position: int):
    print("?")
    document = await collection.find_one({'username':username})
    print(document)
    if document is not None:
        transactions_list = document['transactions']
        
        if position >= len(transactions_list):
            return False

        del transactions_list[position:position+1]
        print(transactions_list)
        await collection.update_one({'username':username}, {'$set' : {'transactions':transactions_list}})
        return True
    else:
        return False
        