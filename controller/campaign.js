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
    var id = req.params['id'];
    if(req.body.status == "WAITING" || req.body.status == "ACTIVE") {
        setTimeout(function(){
        updateCampaign(id);
        console.log(Date.now())
        resp.status(200).json("Invite received succesfully!");
        },300);
    }else if(req.body.status == "CANCELED") {
        console.log("Campanha foi cancelada");
        resp.status(200).json("Campanha foi cancelada");
    }else if(req.body.status == "PAUSED") {
        console.log("Campanha foi pausada");
        resp.status(200).json("Campanha foi pausada");
    }
};

const updateCampaign = function (id) {
    for(let i = 0 ; i < loop_number; i++) {
        setTimeout(() => {
            console.time(id);
            postToCampaignApi(id);
            console.timeEnd(id)
        }, Math.floor(Math.random() * 10000));
    }
};


function postToCampaignApi (id) {
    let invite ;
    let textArray = [
        'declined',
        'accepted'
    ];
    let randomNumber = Math.floor(Math.random() * textArray.length);
    let randomCnpj = Math.floor(Math.random() * 10000000)

    invite = {
        reply: textArray[randomNumber],
        name: faker.Company.companyName(),
        cnpj: randomCnpj.toString(),
        merchandiseHierarchy: [
            {
                quantity: Math.floor(Math.random() * 20),
                stock: Math.floor(Math.random() * 200),
                department: Math.floor(Math.random() * 100),
                subdepartment: Math.floor(Math.random() * 100 / 2)
            },
            {
                quantity: Math.floor(Math.random() * 20),
                stock: Math.floor(Math.random() * 200),
                department: Math.floor(Math.random() * 100)
            }
        ]
    };

    if(invite.reply == 'declined'){
        invite.merchandiseHierarchy = [];
    }


    var extServerOptions = {
        host: configs.host,
        port: configs.campaign_port,
        path: configs.path + id + configs.resource,
        method: configs.method,
        headers: configs.headers
    };

    const reqPost = http.request(extServerOptions, function (res) {
        res.on('data', function (invite) {
            process.stdout.write(invite);
        });
    });

// 7
    reqPost.write(JSON.stringify(invite));
    reqPost.on('error', function (e) {
        console.error(e);
    });
    reqPost.end();

};





module.exports = new Campaign(),updateCampaign;