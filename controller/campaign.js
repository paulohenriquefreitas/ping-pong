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
    //if(req.body.status == "WAITING") {
        updateCampaign(id);
        resp.status(200).json("Invite received succesfully!");
    //}else {
       // console.log("Campanha não está no estado de WAITING");
      //  resp.status(400).json("Campanha não está no estado de WAITING");
  //  }
};

const updateCampaign = function (id) {
    for(let i = 0 ; i < loop_number; i++) {
        postToCampaignApi(id);
    }
};


function postToCampaignApi (id) {

    let textArray = [
        'declined',
        'accepted'
    ];
    let randomNumber = Math.floor(Math.random() * textArray.length);
    let invite = {
        answer: textArray[randomNumber],
        name: faker.Company.companyName(),
        cnpj: 9277482174857,
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