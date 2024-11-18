//Importing Router
const express = require('express');
const router = express.Router();

//Importing Controller for Index
const index=require('../controller/Index.controller');

//Configuring routing
router.post('/login', index.login );
router.get('/logout',index.logout);
router.post('/signup',index.signup);

module.exports = router;