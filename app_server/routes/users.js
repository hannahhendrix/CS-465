var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

/* GET users page */
router.get('/', controller.users);

module.exports = router