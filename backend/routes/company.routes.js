const express = require('express');
const router = express.Router();
const companyController = require('../controller/Company.controller');
const indexController=require('../controller/Index.controller')

router.get('/getName', companyController.getCompanyName);


router.get('/getLogo', companyController.getCompanyLogo);


router.get('/posts/getJobTitle', companyController.getJobTitle);
router.get('/getPosts', companyController.getPosts); 
router.post('/addPost', companyController.addPost); 
router.put('/editPost/:postId', companyController.editPost); 
router.delete('/deletePost/:postId', companyController.deletePost); 
router.post('/login',indexController.login ); 

module.exports = router;
