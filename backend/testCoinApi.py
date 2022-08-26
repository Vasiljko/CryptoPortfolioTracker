from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

symbol = 'BTC'
url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
parameters = {
  'convert':'USD',
  'symbol':symbol
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': '1a85bba4-3a29-48db-a0d4-65d7a1eab56b',
}

session = Session()
session.headers.update(headers)

try:
  response = session.get(url, params=parameters)
  data = json.loads(response.text)
  print(data)
  print(data['data'][symbol][0]['quote']['USD']['price'])
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)