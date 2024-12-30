const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AdminSchema = new schema({
  name: { type: String, match: /([A-ZÀ-ÿ-a-z. ']+[ ]*)+/, required: true},
  username: { type: String, match:/[a-zA-Z0-9]*[@]+[a-z]+[.]+[a-z]{3}/, unique:true, required: true},
  password: { type: String, match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}/,required: true},
  // Consider adding a role field for different admin levels (e.g., 'super_admin', 'admin')
  role: { type: String, enum: ['super_admin', 'admin'], default: 'admin' } 
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;