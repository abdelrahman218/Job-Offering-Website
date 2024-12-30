const express = require('express');
const router = express.Router();


// Admin Controller
const admin = require('../controllers/admin.controller'); 

router.post('/login', admin.login);
router.post('/', admin.addAdmin); // Add a new admin
router.put('/:adminId', admin.updateAdmin); // Update an existing admin

router.get('/users', admin.getAllUsers);
router.get('/companies', admin.getAllCompanies);
router.get('/companies/pending', admin.getPendingCompanies);

router.put('/companies/:companyId/approve', admin.approveCompany);
router.put('/companies/:companyId/reject', admin.rejectCompany);

router.put('/users/:userId/status', admin.updateUserStatus);
router.delete('/users/:userId', admin.deleteUser);

router.put('/companies/:companyId', admin.updateCompany); // Update specific company info
router.delete('/companies/:companyId', admin.deleteCompany);

module.exports = router;
