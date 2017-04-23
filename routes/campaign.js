var express = require('express');
var router = express.Router();
var campaignController = require('../controller/campaign');


router.get('/', campaignController.getAll);
router.post('/', campaignController.create);
router.put('/:id', campaignController.update);

module.exports = router;