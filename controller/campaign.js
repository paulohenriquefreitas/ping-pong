'use strict';

var http = require('http');

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
    var newCampaign = req.body;
    newCampaign.answer = "accepted";
    newCampaign.name = "megamammute";

    postToCampaignApi(req,resp, next,newCampaign);

    resp.send(newCampaign);
};

function postToCampaignApi (req,resp, next,newCampaign){
    var extServerOptions = {
        host: 'localhost',
        port: '8080',
        path: 'campaigns/58f3f274c90fcb1d97f0ba23/receive',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length' : Buffer.byteLength(newCampaign, 'utf8')
        }
    };

    var reqPost = http.request(extServerOptions, function (res) {
        console.log("response statusCode: ", res.statusCode);
        res.on('data', function (newCampaign) {
            console.log('Posting Result:\n');
            //process.stdout.write(newCampaign);
            console.log('\n\nPOST Operation Completed');
        });
    });

// 7
    reqPost.write(JSON.stringify(newCampaign));
    reqPost.end();
    reqPost.on('error', function (e) {
        console.error(e);
    });
    console.log(extServerOptions)
}





module.exports = new Campaign(),updateCampaign;