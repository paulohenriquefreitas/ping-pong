'use strict';

var departments = ['CoolStufs','Celulares','Games','Informática e Tablets'
    ,'Tv,Áudio e Home Theater','Livros','Filmes, Series e Música'
    ,'Moda, Beleza e Perfumaria','Eletrodomésticos','Móveis e Decorações','Viagens'];

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
    var newCampaign = req.body;
    newCampaign.excludedProducts = departments;

    for(var i = 0; i <= departments.length; i++ ){
        var index = Math.floor(Math.random() * departments.length)
        if (!newCampaign.includedProducts.includes(departments[index])) {
            newCampaign.includedProducts.push(departments[index]);
            newCampaign.excludedProducts.splice(newCampaign.excludedProducts.indexOf(departments[index]),1);
        }
    };
    console.log(newCampaign['includedProducts']);
    resp.send(req.body);
};;



module.exports = new Campaign(),updateCampaign;