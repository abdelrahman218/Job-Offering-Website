async function getProfilePicture(req, res) {
  const users = require("../models/User.model");
  userEmail = req.query.email;
  let user = await users.findOne({ Email: userEmail });
  if (!user) {
    res.status(406).send("User Not Found");
    return;
  }
  res.setHeader("Content-Type", "image/jpeg");
  res.status(200).sendFile("/Multimedia/profile-pics/" + user.ProfilePic, {
    root: __dirname.replace("\\controller", ""),
  });
}
async function getApplications(req, res) {
    const applications = require("../models/Application.model");
    userEmail = req.query.email;
    const userApps=await applications.find({Applicant: userEmail});
    res.status(200).send({Apps: userApps});
}
async function addSkill(req, res) {
  const users = require("../models/User.model");
  const userEmail = req.body.Email;
  const skill = req.body.Skill;
  let user = await users.findOne({ Email: userEmail });
  //Responds with an error if User is not in the database
  if (!user) {
    res.status(406).send("User Not Found");
    return;
  }
  let newSkills = user.Skills;
  //Responds with an error if skill already exists
  if (newSkills.includes(skill)) {
    res.status(400).send("Skill already exists");
    return;
  }
  newSkills = [...newSkills, skill];
  await users.findOneAndUpdate({ Email: userEmail }, { Skills: newSkills });
  res.status(200).send();
}
async function removeSkill(req, res) {
  const users = require("../models/User.model");
  const userEmail = req.body.Email;
  const skill = req.body.Skill;
  let user = await users.findOne({ Email: userEmail });
  //Responds with an error if User is not in the database
  if (!user) {
    res.status(406).send("User Not Found");
    return;
  }
  let newSkills = user.Skills;
  //Responds with an error if skill is not found
  if (!newSkills.includes(skill)) {
    res.status(400).send("Skill isn't found");
    return;
  }
  newSkills = newSkills.filter((sk) => sk !== skill);
  await users.findOneAndUpdate({ Email: userEmail }, { Skills: newSkills });
  res.status(200).send();
}
async function removeApplication(req, res) {
  const applications = require("../models/Application.model");
  const userEmail = req.body.Email;
  const post = req.body.Post;
  let application = await applications.findOne({
    Applicant: userEmail,
    Post: post,
  });
  if (!application) {
    res.status(406).send("Application Not Found");
    return;
  }

  await applications
    .deleteOne({ Applicant: userEmail, Post: post })
    .catch(() => {
      res.status(500).send("Application Couldn't be deleted");
      return;
    });
    res.status(200).send();
}
async function editProfile(req,res){
  const users = require("../models/User.model");
  const userEmail = req.body.Email;
  const Name = req.body.Name;
  const ProfessionalTitle=req.body.ProfessionalTitle;
  var Password=req.body.Password;

  let user = await users.findOne({ Email: userEmail });
  //Responds with an error if User is not in the database
  if (!user) {
    res.status(406).send("User Not Found");
    return;
  }
  if(!Password){
    Password=user.Password;
  }
  await users.findOneAndUpdate({ Email: userEmail }, { Name: Name, ProfessionalTitle: ProfessionalTitle, Password: Password });
  res.status(200).send();
}
async function editProfilePhoto(req,res){
  const fsExtra= require('fs-extra');
  const users = require("../models/User.model");
  const userEmail = req.body.Email;
  const photo = req.files.Photo;

  let user = await users.findOne({ Email: userEmail });
  //Responds with an error if User is not in the database
  if (!user) {
    res.status(406).send("User Not Found");
    return;
  }
  fsExtra.removeSync(__dirname.replace('\\controller','\\Multimedia\\profile-pics\\')+user.ProfilePic)
  await photo.mv(__dirname.replace('\\controller','\\Multimedia\\profile-pics\\')+photo.name);
  await users.findOneAndUpdate({ Email: userEmail }, { ProfilePic: photo.name });
  res.status(200).send();
}
module.exports = {
  getProfilePicture,
  getApplications,
  addSkill,
  removeSkill,
  removeApplication,
  editProfile,
  editProfilePhoto
};