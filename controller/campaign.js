'use strict';

const http = require('http');

const requestpromise = require('request-promise')

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
        updateCampaign(id,req,resp);
        console.log(Date.now())
        resp.status(200).json("Invite received succesfully!");
        },30);
    }else if(req.body.status == "CANCELED") {
        console.log("Campanha foi cancelada");
        resp.status(200).json("Campanha foi cancelada");
    }else if(req.body.status == "PAUSED") {
        console.log("Campanha foi pausada");
        resp.status(200).json("Campanha foi pausada");
    }
};

const updateCampaign = function (id,req,resp) {
    for(let i = 0 ; i < loop_number; i++) {
        setTimeout(() => {
            console.time(id);
            postToCampaignApi(id,req,resp);
            console.timeEnd(id)
        }, Math.floor(Math.random() * 10));
    }
};


function postToCampaignApi (id,req,resp) {
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

    const options = {
        method: 'POST',
        uri: configs.campaign_url + configs.path + id + configs.resource,
        body: invite,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmFtZSI6InBvcnRhbC5zZXJ2aWNlIiwidXNlcm5hbWUiOiJwb3J0YWwuc2VydmljZSIsImVtYWlsIjoicG9ydGFsLnNlcnZpY2UiLCJleHAiOjE1Mjc4ODE2Njh9.MVWPQWMclsO6Sgiqe16S_XtHgAL_OsrAt6Gh9SdKk2s"
        },
        json: true
    }
    console.log("Uri" + options.uri)


    requestpromise(options)
        .then(function (response) {
            console.log("Sucesso" + response);

        })
        .catch(function (err) {
            console.log("Erro" + err.message)

        });

};





module.exports = new Campaign(),updateCampaign;