const Memcached = require('memcached');
let memCached = new Memcached(process.env.CACHE_HOSTNAME);
const cachePrefix = 'pipedrive';
const duration = 60 * 60;
module.exports = {
    get: (key, callback) => {
        memCached.get(`${cachePrefix}_${key.replace(' ', '_')}`, (err, data) => {
            callback(data);
        });
    },

    set: (key, data, callback) => {
        memCached.set(`${cachePrefix}_${key.replace(' ', '_')}`, data, duration, (err) => {
            if(callback){
                callback(err);
            }
        })
    }
};