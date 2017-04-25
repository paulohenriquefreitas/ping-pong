'use strict';

const environment =  () => {
    let env = process.env.NODE_ENV;

    const pingpong = require('../ping-pong.json');

    return {
        host:  pingpong.environments.development.campaing.host,
        port:  pingpong.environments.development.campaing.port,
        path:  pingpong.environments.development.campaing.path,
        resource: pingpong.environments.development.campaing.resource,
        method:pingpong.environments.development.campaing.method,
        headers:  pingpong.environments.development.campaing.headers
    }




};

module.exports = environment();