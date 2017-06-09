'use strict';

const campaign = require('./campaign');
const rs = require('./resource-status');
const health = require('./health');

const core = { campaign, rs, health };

module.exports = core;