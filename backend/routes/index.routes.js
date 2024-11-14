//Importing Router
const express = require('express');
const router = express.Router();

//Importing Controller for Index
const index=require('../controller/Index.controller');

//Configuring routing
router.get('/login', index.login );
router.get('/signup',index.signup);

module.exports = router;