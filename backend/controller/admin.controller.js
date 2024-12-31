const Admin = require('../models/Admin.model.js');
const User = require('../models/User.model.js');
const Company = require('../models/Company.model.js');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to handle errors
const handleError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message: message || 'An error occurred' });
};

// Add a new admin
async function addAdmin(req, res) {
  try {
    const { name, email, password, role } = req.body;
    console.log('Received admin email in controller:', email);
    const newAdmin = new Admin({ name, email, password, role });    
    const savedAdmin = await newAdmin.save();
    // Data Validation 
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'email already exists' });
    }

    res.status(200).json({ message: 'Admin registered successfully', admin: savedAdmin });
  } catch (error) {
    handleError(res, error, 'Error creating admin');
  }
}

// Update an existing admin
async function updateAdmin(req, res) {
  try {
    const adminId = req.params.adminId;
    const { name, email } = req.body; // Only update modifiable fields

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, { name, email }, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (error) {
    handleError(res, error, 'Error updating admin');
  }
}


// Admin Login
async function login(req, res) {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ email: username }); 

    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    

    // Generate JWT and send success response 
    const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_secret_key');
    res.json({ token, admin: { id: admin._id, name: admin.name, password: admin.password,role: admin.role } }); 

  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get All Users
async function getAllUsers(req, res) {
    try {
      const users = await User.find(); 
      console.log('Users from database:', users); 
      res.status(200).json(users);
    } catch (error) {
      handleError(res, error, 'Error fetching users');
    }
  }

// Get All Companies
async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find(); 
    console.log('Companies from database:', companies); 
    res.status(200).json(companies);
  } catch (error) {
    handleError(res, error, 'Error fetching companies');
  }
}

// Get Pending Company Requests
async function getPendingCompanies(req, res) {
  try {
    const pendingCompanies = await Company.find({ status: 'pending' });
    res.status(200).json(pendingCompanies);
  } catch (error) {
    handleError(res, error, 'Error fetching pending companies');
  }
}

// Approve a Company Request
async function approveCompany(req, res) {
  try {
    const companyId = req.params.companyId;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { status: 'approved' },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company approved successfully' });
  } catch (error) {
    handleError(res, error, 'Error approving company');
  }
}

// Reject a Company Request
async function rejectCompany(req, res) {
  try {
    const companyId = req.params.companyId;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { status: 'rejected' },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company rejected successfully' });
  } catch (error) {
    handleError(res, error, 'Error rejecting company');
  }
}

// Update a User (e.g., block/unblock)
async function updateUserStatus(req, res) {
  try {
    const userId = req.params.userId;
    const { isBlocked } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { isBlocked }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User status updated successfully', user: updatedUser });
  } catch (error) {
    handleError(res, error, 'Error updating user status');
  }
}

// Delete a User (with caution and proper safeguards)
async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Error deleting user');
  }
}

// Update Company Information (e.g., approve company profile)
async function updateCompany(req, res) {
  try {
    const companyId = req.params.companyId;
    const updatedCompanyData = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedCompanyData, { new: true });

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    handleError(res, error, 'Error updating company');
  }
}

// Delete Company (with caution and proper safeguards)
async function deleteCompanyByName(req, res) {
    try {
      const companyName = req.params.companyName; 
  
      if (!companyName) {
        return res.status(400).json({ message: 'Company name is missing' });
      }
  
      const deletedCompany = await Company.findOneAndDelete({ name: companyName });
  
      if (!deletedCompany) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      console.error('Error deleting company:', error); 
      return res.status(500).json({ message: 'Internal server error' }); 
    }
  }

module.exports = {
  addAdmin,
  updateAdmin,
  login,
  getAllUsers,
  getAllCompanies,
  getPendingCompanies,
  approveCompany,
  rejectCompany,
  updateUserStatus,
  deleteUser,
  updateCompany,
  deleteCompanyByName,
};