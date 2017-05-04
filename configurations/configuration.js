'use strict';

const environment =  () => {
    let env = process.env.NODE_ENV;

    const pingpong = require('../ping-pong.json');

    if (!env) {

        console.log("[ERROR] Environment env (NODE_ENV):", env);
        return process.exit(1);

    }

    if(env == 'production'){

        return {
            port:  process.env.PORT ? process.env.PORT : 9000,
            mongo: {
                url:                process.env.MONGO_URL ? process.env.MONGO_URL : 'localhost:27017',
                base:               process.env.MONGO_BASE ? process.env.MONGO_BASE : 'campaign-service_data',
                user:               process.env.MONGO_USER ? process.env.MONGO_USER : '',
                password:           process.env.MONGO_PASSWORD ? process.env.MONGO_PASSWORD : '',
                readPreferenceTags: process.env.MONGO_READ_PREFERENCE_TAGS ? process.env.MONGO_READ_PREFERENCE_TAGS : ""
            }
        }

    }else {
        return {
            host: pingpong.environments.development.campaing.host,
            port: pingpong.environments.development.port,
            path: pingpong.environments.development.campaing.path,
            resource: pingpong.environments.development.campaing.resource,
            method: pingpong.environments.development.campaing.method,
            headers: pingpong.environments.development.campaing.headers

        }
    }




};

module.exports = environment();