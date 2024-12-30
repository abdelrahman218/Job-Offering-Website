const Admin = require('../models/Admin');
const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to handle errors
const handleError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message: message || 'An error occurred' });
};

// Add a new admin
async function addAdmin(req, res) {
  try {
    const { name, username, password } = req.body;

    // Data Validation 
    if (!name || !username || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for username existence (assuming usernames are unique)
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newAdmin = new Admin({ name, username, password: hashedPassword });
    const savedAdmin = await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully', admin: savedAdmin });
  } catch (error) {
    handleError(res, error, 'Error creating admin');
  }
}

// Update an existing admin
async function updateAdmin(req, res) {
  try {
    const adminId = req.params.adminId;
    const { name, username } = req.body; // Only update modifiable fields

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, { name, username }, { new: true });

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

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_secret_key');

    res.json({ token, admin: { id: admin._id, name: admin.name, role: admin.role } });
  } catch (error) {
    handleError(res, error, 'Login failed');
  }
}

// Get All Users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error, 'Error fetching users');
  }
}

// Get All Companies
async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find();
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
async function deleteCompany(req, res) {
  try {
    const companyId = req.params.companyId;

    const deletedCompany = await Company.findByIdAndDelete(companyId);

    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Error deleting company');
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
  deleteCompany,
};