const Memcached = require('memcached');
let memCached = new Memcached(process.env.CACHE_HOSTNAME);
const cachePrefix = 'pipedrive';
const duration = 60 * 60;
module.exports = {
    get: (key, callback) => {
        console.log(`${cachePrefix}_${key}`);
        memCached.get(`${cachePrefix}_${key}`, (err, data) => {
            callback(data);
        });
    },

    set: (key, data) => {
        console.log(`${cachePrefix}_${key}`);
        memCached.set(`${cachePrefix}_${key}`, data, duration, (err) => {
            console.log(err);
        })
    }
};