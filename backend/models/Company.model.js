const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CompanySchema = new schema({
  name: { type: String, match: /([A-ZÀ-ÿ-a-z. ']+[ ]*)+/, required: true },
  Email: { 
    type: String, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
    unique: true, 
    required: true 
  },
  Password: { 
    type: String, 
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
    required: true 
  },
  logo: { type: String, default: "" }, 
  industry: { type: String, required: true },
  location: { type: String, match: /([A-ZÀ-ÿ-a-z. ']+[ ]*)+/, required: true },
  description: { type: String, default: "" },
}, { timestamps: true });

const Companies = mongoose.model('Companies', CompanySchema);
module.exports = Companies;
