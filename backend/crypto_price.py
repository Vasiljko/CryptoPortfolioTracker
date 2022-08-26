from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': '1a85bba4-3a29-48db-a0d4-65d7a1eab56b',
}






async def fetch_crypto_price(crypto_symbol: str):
    parameters = {
        'convert':'USD',
        'symbol':crypto_symbol
    }
    
    session = Session()
    session.headers.update(headers)
    
    try:
        response = session.get(url, params=parameters)
        data = json.loads(response.text)
        print(data)
        print(data['data'][crypto_symbol][0]['quote']['USD']['price'])
        return data['data'][crypto_symbol][0]['quote']['USD']['price']
    except Exception as e:
        print(e)
        return None