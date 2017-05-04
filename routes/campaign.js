const express = require('express');
const router = express.Router();
const campaignController = require('../controller/campaign');


router.get('/', campaignController.getAll);
router.post('/', campaignController.create);
router.put('/:id', campaignController.update);

module.exports = router;