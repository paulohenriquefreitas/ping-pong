'use strict';

const router = require('express').Router();
const configs = require('../configurations');

router.get("/", (req, res) => {

  res.status(200).json({
    
    createdBy: 'paulo.freitas>',
    version: process.version,
    applicationName: 'ping-pong'

  });

});

module.exports = router;