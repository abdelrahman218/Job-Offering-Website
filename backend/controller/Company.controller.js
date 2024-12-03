const Company = require('../models/Company.model'); 
const Post = require('../models/posts.model'); 

// get company name
exports.getCompanyName = async (req, res) => {
  const { companyEmail } = req.query;

  try {
    const company = await Company.findOne({ email: companyEmail });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ companyName: company.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Company Logo
exports.getCompanyLogo = async (req, res) => {
  const { companyEmail } = req.query;

  try {
    const company = await Company.findOne({ email: companyEmail });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).send(`<img src="${company.logo}" alt="Company Logo" />`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// get Job Title
exports.getJobTitle = async (req, res) => {
  const { postId } = req.query;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ jobTitle: post.jobTitle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

//Get Posts
exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
  };
  
  // Add a new post
  exports.addPost = async (req, res) => {
    
  

     let  newPost = new Post({
      jobTitle:req.body.jobTitle,
      careerLevel:req.body.careerLevel,
      jobCategory:req.body.jobCategory,
      workplace:req.body.workplace,
      jobDescription:req.body.jobDescription,
      jobRequirements:req.body.jobRequirements,
      companyEmail:Company.companyEmail,
      tags:req.body.tags
      });
      console.log(newPost)
       newPost.save().catch(err => {
        console.log(err);
      }); // Save to the database
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    };
 
  
  // Edit an existing post
  exports.editPost = async (req, res) => {
    const { postId } = req.params;
    const updates = req.body;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, updates, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
  };
  
  // Delete a post
  exports.deletePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
  };