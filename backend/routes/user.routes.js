//Importing Router
const express = require('express');
const router = express.Router();

//Importing Controller for User
const user=require('../controller/User.controller');

//Configuring routes
router.post('/addSkill',user.addSkill);
router.post('/removeSkill',user.removeSkill);

module.exports = router;