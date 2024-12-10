const mongoose = require('mongoose');
const schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);
const PostSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, 
  jobTitle: { type: String, match: /([A-ZÀ-ÿ-a-z. ']+[ ]*)+/, required: true },
  careerLevel: { 
    type: String, 
    enum: ['Internship', 'Junior Level/Fresh Grad', 'Experienced', 'Manager', 'Senior Management'], 
    required: true 
  },
  jobCategory: { 
    type: String, 
    enum: ['Full-Time', 'Part-Time', 'Freelance/Project'], 
    required: true 
  },
  workplace: { 
    type: String, 
    enum: ['On-site', 'Remote', 'Hybrid'], 
    required: true 
  },
  jobDescription: { type: String, required: true },
  jobRequirements: { type: String, required: true },
  companyEmail: { 
    type: String, 
    required: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
  },
  tags: { 
    type: [String], 
    default: []
  }
}, { timestamps: true
 });
 PostSchema.plugin(autoIncrement, { inc_field: 'id' });
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
