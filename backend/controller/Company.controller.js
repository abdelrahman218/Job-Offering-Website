const Company = require('../models/Company.model');
const Post = require('../models/posts.model');
const Application = require('../models/Application.model');
const path = require("path");
const fs = require("fs");
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies' });
  }
}
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
  let newPost = new Post({
    id: Date.now(),
    jobTitle: req.body.jobTitle,
    careerLevel: req.body.careerLevel,
    workplace: req.body.workplace,
    jobCategory: req.body.jobCategory,
    jobDescription: req.body.jobDescription,
    jobRequirements: req.body.jobRequirements,
    companyEmail: req.body.companyEmail,
    tags: req.body.tags
  });
  newPost.save().catch(err => {
    console.log(err);
  }); // Save to the database
  res.status(201).json({ message: 'Post created successfully', post: newPost });
};

// Edit an existing company by numerical ID
exports.editProfile = async (req, res) => {
  try {
    const { companyEmail } = req.params;
    const updates = req.body;
    if(req.files){
    const Logo=req.files.logo;
    await Logo.mv(__dirname.replace('\\controller', '\\Multimedia\\company-logo\\') + Logo.name);
    updates.logo=Logo.name;
    }
    const updatedCompany = await Company.findOneAndUpdate({ Email: companyEmail }, updates, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company updated successfully', Company: updatedCompany });
  } catch (error) {
    console.error('Error updating Company:', error);
    res.status(500).json({ message: 'Failed to update Company', error: error.message });
  }
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
exports.getApplicationsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const applications = await Application.find({ Post: postId });
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this post' });
    }
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};
exports.updateApplicationState = async (req, res) => {
  try {
    // Find the application first to see if it exists
    const { Applicant, Post, State } = req.body;

    const existingApplication = await Application.findOne({
      Applicant,
      Post
    });

    if (!existingApplication) {
      console.log('Application not found with criteria:', { Applicant, Post });
      return res.status(404).json({
        message: 'Application not found',
        searchCriteria: { Applicant, Post }
      });
    }

    // Proceed with update
    const application = await Application.findOneAndUpdate(
      { Applicant, Post },
      { State },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: 'Application state updated successfully',
      application
    });

  } catch (error) {
    console.error('Error updating application state:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({
      message: 'Failed to update application state',
      error: error.message,
      details: error.stack
    });
  }
};

exports.getApplicationsByCompanyEmail = async (req, res) => {
  const { companyEmail } = req.params;

  try {
    const applications = await Application.find({ Company: companyEmail });
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this company' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};
exports.registerCompany = async (req, res) => {
  try {
    // Check if company with email already exists
    const existingCompany = await Company.findOne({ Email: req.body.Email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company with this email already exists' });
    }
    const Logo=req.files.logo;
    // Create new company in a pending state
    const newCompany = new Company({
      name: req.body.name,
      Email: req.body.Email,
      Password: req.body.Password,
      industry: req.body.industry,
      location: req.body.location,
      description: req.body.description || '',
      logo: Logo.name|| '',
      status: 'pending'
    });

    // Save the company
    await Logo.mv(__dirname.replace('\\controller', '\\Multimedia\\company-logo\\') + Logo.name);
    await newCompany.save();

    res.status(201).json({
      message: 'Company registration is pending approval. The admin will review it shortly.',
      company: {
        name: newCompany.name,
        Email: newCompany.Email,
        industry: newCompany.industry,
        location: newCompany.location
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Failed to register company',
      error: error.message
    });
  }
};
// Serve CV file
exports.downloadCV = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname.replace('\\controller', '\\Multimedia\\CVs\\'), filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  });
};
