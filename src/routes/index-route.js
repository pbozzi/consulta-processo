'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-controller');

router.get('/', controller.get);
router.get('/:numero', controller.consultar);

module.exports = router;