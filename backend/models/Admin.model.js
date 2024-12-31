const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AdminSchema = new schema({
  name: { type: String, match: /([A-ZÀ-ÿ-a-z. ']+[ ]*)+/, required: true},
  email: {type: String, match:/[a-zA-Z0-9]*[@]+[a-z]+[.]+[a-z]{3}/, unique:true, required: true},
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
      },
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.' 
    }
  },
  // Consider adding a role field for different admin levels (e.g., 'super-admin', 'admin')
  role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' } 
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;