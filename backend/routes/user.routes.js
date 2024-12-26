//Importing Router
const express = require('express');
const router = express.Router();

//Importing Controller for User
const user=require('../controller/User.controller');
const sessions=require('../controller/session.controller')
const applications=require('../controller/Application.controller')

//Non-Authenticatory Url
router.get('/image',user.getProfilePicture);

//Authenticating User
router.use((req,res,next)=>{
    let auth=sessions.openSessions.find(ele=>ele.SessionID===req.headers.sessionid);
    if((auth&&auth.Role==='User')||auth.Role==='Admin'){
        next();
    }
    else{
        res.status(401).send('unauthorized access');
    }
})

//Configuring routes
router.get('/getApplications',user.getApplications);
router.get('/getAppliedJobs', applications.getAppliedJobs);
router.post('/editProfile',user.editProfile);
router.post('/editProfilePhoto',user.editProfilePhoto)
router.post('/addSkill',user.addSkill);
router.post('/removeSkill',user.removeSkill);
router.post('/removeApplication',user.removeApplication);
router.post('/submitCV',applications.submitCV);

module.exports = router;