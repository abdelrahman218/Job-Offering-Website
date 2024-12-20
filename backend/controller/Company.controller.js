const Company = require('../models/Company.model'); 
const Post = require('../models/posts.model'); 

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
      id:Date.now(),
      jobTitle:req.body.jobTitle,
      careerLevel:req.body.careerLevel,
      workplace:req.body.workplace,
      jobCategory:req.body.jobCategory,
      jobDescription:req.body.jobDescription,
      jobRequirements:req.body.jobRequirements,
      companyEmail:req.body.companyEmail,
      tags:req.body.tags
      });
      console.log(newPost)
       newPost.save().catch(err => {
        console.log(err);
      }); // Save to the database
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    };
 
  
  // Edit an existing post by numerical ID
exports.editPost = async (req, res) => {
  const { postId } = req.params;
  const updates = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate({ id: postId }, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
};

  
  // Delete a post by Id
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findOneAndDelete({ id: postId });
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
};

  // Get Posts by Company Email
exports.getPostsByCompanyEmail = async (req, res) => {
  const { companyEmail } = req.params;

  try {
    // Find all posts that match the companyEmail
    const posts = await Post.find({ companyEmail });
    console.log(posts);
    // Check if posts exist for the given companyEmail
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this company' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};
// Get Company Name by Email
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

// Get Company Logo by Email
exports.getCompanyLogo = async (req, res) => {
  companyEmail = req.query.email;
  let company = await Company.findOne({ Email: companyEmail });
  if (!company) {
    res.status(406).send("Company Not Found");
    return;
  }
  res.setHeader("Content-Type", "image/jpeg");
  res.status(200).sendFile("/Multimedia/company-logo/" + company.logo, {
    root: __dirname.replace("\\controller", ""),
  });
};

// Get Job Title by Post ID
exports.getJobTitle = async (req, res) => {
 const { postId } = req.params;

  try {
    const post = await Post.findOne({ id: postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ jobTitle: post.jobTitle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Get a post by ID
exports.getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ id: postId }); // Assuming you're using 'id' field for the post's identifier
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post); // Send the post data as a response
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};