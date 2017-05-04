'use strict';

const http = require('http');

const faker = require('Faker');

const loop_number =  process.env.LOOP_NUMBER ? process.env.LOOP_NUMBER : 10;

const configs = require('../configurations').Configuration;
function Campaign(){}

Campaign.prototype.getAll = function (req,resp, next){
    resp.send('get all campaigns');
};

Campaign.prototype.create = function (req,resp, next){
    resp.send('create a  campaigns');
};

Campaign.prototype.update = function (req,resp, next){
    resp.json(updateCampaign(req,resp,next));
};

const updateCampaign = function (req,resp, next) {
    const id = req.params['id'];

    const newCampaign = req.body;

    for(let i = 0 ; i < loop_number; i++) {
        postToCampaignApi(req, resp, next, newCampaign, id);
    }
    resp.send(newCampaign);

};


function postToCampaignApi (req,resp, next,newCampaign,id){

    let textArray = [
        'declined',
        'accepted'
    ];
    let randomNumber = Math.floor(Math.random()*textArray.length);

    newCampaign.answer = textArray[randomNumber];
    newCampaign.name = faker.Company.companyName()


    var extServerOptions = {
        host: configs.host,
        port: configs.port,
        path: configs.path + i + configs.resource,
        method: configs.method,
        headers: configs.headers
    };

    console.log(extServerOptions.host+extServerOptions.port+extServerOptions.path)
    const reqPost = http.request(extServerOptions, function (res) {
        console.log("response statusCode: ", res.statusCode);
        res.on('data', function (newCampaign) {
            console.log('Posting Result:\n');
            process.stdout.write(newCampaign);
            console.log('\n\nPOST Operation Completed');
        });
    });

// 7
    reqPost.write(JSON.stringify(newCampaign));
    reqPost.on('error', function (e) {
        console.error(e);
    });
    reqPost.end();

}





module.exports = new Campaign(),updateCampaign;