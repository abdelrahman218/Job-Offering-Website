const Application = require('../models/Application.model');

async function submitCV(req, res) {
    const userEmail = req.body.Email;
    const cv = req.files.CV;
    const CompanyEmail = req.body.CompanyEmail;
    const PostID = Number(req.body.PostID);
    let app=new Application({
        Applicant: userEmail,
        Company:CompanyEmail,
        Post:PostID,
        CV: cv.name
    });
    app.save();
    await cv.mv(__dirname.replace('\\controller', '\\Multimedia\\CVs\\') + cv.name);
    res.status(200).send();
}
async function getAppliedJobs(req, res) {
    const Email = req.query.Email;
    console.log(Email);
    let Posts = await Application.find({
        Applicant: Email
    });
    console.log(Posts);
    Posts=Posts.flatMap((ele)=>ele.Post)
    console.log(Posts);
    res.status(200).send(Posts);
}
module.exports = {
    submitCV,
    getAppliedJobs
};