'use strict';

const router = require('express').Router();

var health = {
    name: 'Campaign-service',
    message: 'Sucesso ao consultar dependências',
    success: true,
    status: 'OK',
    statusCode: 200,
    time: new Date().toUTCString(),
    dependencies: []
}

router.get("/", (req, res) => {
    res.status(200).json(health);
});


module.exports = router;
