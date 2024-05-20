const dos = require('./bin')
const configs = __dirname+'/config.json';
dos(configs.urls, configs.request, configs.req_time)
