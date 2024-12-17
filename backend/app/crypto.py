import time
import requests


def get_crypto_data(cache):
    """
    Fetches data on the top 5 cryptocurrencies from the CoinGecko API.
    Uses cache to store data and respects the request limit.

    Parameters:
        cache: Cache object to store the data and time of the last request.

    Returns:
        filtered_data (list): Formatted cryptocurrency data.
    """

    cached_data = cache.get("crypto_data")
    if cached_data:
        print("Retornando dados do cache...")
        return cached_data

    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 5,
        "page": 1,
        "sparkline": "false",
    }

    last_request_time = cache.get("last_request_time") or 0

    elapsed_time = time.time() - last_request_time
    if elapsed_time < 2:
        wait_time = 2 - elapsed_time
        print(f"Wait {wait_time:.2f} seconds to respect the request limit...")
        time.sleep(wait_time)

    retries = 3
    for attempt in range(retries):
        try:
            print("Fetching new data from the CoinGecko API...")
            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()

                filtered_data = [
                    {
                        "name": crypto["name"],
                        "symbol": crypto["symbol"],
                        "current_price": crypto["current_price"],
                        "price_change_percentage_24h": crypto[
                            "price_change_percentage_24h"
                        ],
                        "image": crypto["image"],
                        "market_cap": crypto["market_cap"],
                    }
                    for crypto in data
                ]

                cache.set("crypto_data", filtered_data, timeout=60)
                cache.set("last_request_time", time.time(), timeout=60)

                print("New data stored in cache.")
                return filtered_data
            else:
                print(f"Error in API response (Status Code: {response.status_code})")
                time.sleep(2)
        except requests.exceptions.RequestException as e:
            print(f"Error in attempt{attempt + 1}: {e}")
            time.sleep(2)

    print("Failed to get data after multiple attempts.")
    return None
