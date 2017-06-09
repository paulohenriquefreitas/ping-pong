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
            port: process.env.PORT ? process.env.PORT : '8000',
            campaign_url:  process.env.CAMPAIGN_URL ? process.env.CAMPAIGN_URL : 'localhost:7000',
            path: process.env.CAMPAIGN_PATH ? process.env.CAMPAIGN_PATH : '/campaign/',
            resource: process.env.CAMPAIGN_RESOURCE ? process.env.CAMPAIGN_RESOURCE : '/answer',
            method: process.env.CAMPAIGN_HOST ? process.env.CAMPAIGN_METHOD : 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmFtZSI6InBvcnRhbC5zZXJ2aWNlIiwidXNlcm5hbWUiOiJwb3J0YWwuc2VydmljZSIsImVtYWlsIjoicG9ydGFsLnNlcnZpY2UiLCJleHAiOjE1Mjc4ODE2Njh9.MVWPQWMclsO6Sgiqe16S_XtHgAL_OsrAt6Gh9SdKk2s"

            }
        }

    }else {
        return {
            host: pingpong.environments.development.campaing.host,
            port: pingpong.environments.development.port,
            campaign_port:  pingpong.environments.development.campaing.port,
            path: pingpong.environments.development.campaing.path,
            resource: pingpong.environments.development.campaing.resource,
            method: pingpong.environments.development.campaing.method,
            headers: pingpong.environments.development.campaing.headers

        }
    }




};

module.exports = environment();