const express = require('express');
const router = express.Router();
const companyController = require('../controller/Company.controller');
const indexController=require('../controller/Index.controller')

router.get('/getName/:companyEmail', companyController.getCompanyName);


router.get('/getLogo', companyController.getCompanyLogo);


router.get('/posts/getJobTitle/:postId', companyController.getJobTitle);
router.get('/getPosts', companyController.getPosts); 
router.post('/addPost', companyController.addPost); 
router.put('/editPost/:postId', companyController.editPost); 
router.delete('/deletePost/:postId', companyController.deletePost); 
router.post('/login',indexController.login ); 
router.get('/getPostsByCompanyEmail/:companyEmail',companyController.getPostsByCompanyEmail);
router.get('/getPostById/:postId', companyController.getPostById);
router.get('/getCompanies',companyController.getCompanies);
router.get('/applications/:postId', companyController.getApplicationsByPost); 
router.put('/applications/updateState/:post', companyController.updateApplicationState); 
router.get('/applications/company/:companyEmail', companyController.getApplicationsByCompanyEmail); 
router.post('/register', companyController.registerCompany);
module.exports = router;
