const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

const Cache = {};

checkCache = async (hash, key) => {
    return new Promise((resolve, reject) => {
        try {
            redisClient.hmget(hash, key, (err, data) => {
                if(err) {
                    return reject(err);
                }else{
                    return resolve(data);
                }
            });
        }catch(e) {
            return reject(e);
        }
    });
};

Cache.setCache = async (hash, key, value) => {
    return new Promise((resolve, reject) => {
        try {
            redisClient.hmset(hash, {[key]: value}, (err, data) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }catch(e) {
            return reject(e);
        }
    });
};

Cache.getCache = async (hash, key) => {
    return new Promise((resolve, reject) => {
        try {
            redisClient.hmget(hash, key, (err, data) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }catch(e) {
            return reject(e);
        }
    });
};

Cache.delete = async (hash, key) => {
    return new Promise((resolve, reject) => {
        try {
            redisClient.hdel(hash, key, (err, data) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }catch(e) {
            return reject(e);
        }
    });
};

Cache.cache = async (req, res, next) => {
    try {
        const cacheData = await checkCache(req.baseUrl, req.params.id);
        if(cacheData[0] !== null) {
            console.log('Cache...');
            res.status(200).json({
                status: 'success',
                action: 'fetch',
                data: JSON.parse(cacheData)
            });
        }else{
            next();
        }
    }catch(error) {
        console.log('Err', error);
    }
};

module.exports = Cache;