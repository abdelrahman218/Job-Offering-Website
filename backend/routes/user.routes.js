//Importing Router
const express = require('express');
const router = express.Router();

//Importing Controller for User
const user=require('../controller/User.controller');

//Configuring routes
router.get('/image',user.getProfilePicture);
router.get('/getApplications',user.getApplications);
router.post('/editProfile',user.editProfile);
router.post('/editProfilePhoto',user.editProfilePhoto)
router.post('/addSkill',user.addSkill);
router.post('/removeSkill',user.removeSkill);
router.post('/removeApplication',user.removeApplication);

module.exports = router;