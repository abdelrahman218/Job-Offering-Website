const UserModel = require('../models/User.model')
const companyModel=require('../models/Company.model');
const sessions=require('./session.controller');
function login(req, res) {
  var query = { Email: req.body.Email, Password: req.body.Password };
  let companyPromise= companyModel.findOne(query);
  let userPromise = UserModel.findOne(query);
  Promise.all([companyPromise, userPromise])
    .then(results => {
      let companyResult=results[0];
      let userResult = results[1];
      if (userResult != null) {
        userResult.Password='';
        sessions.openSessions.push({SessionID: req.sessionID, Role: 'User'});
        res.status(200).send({UserType: 'User',User: userResult, SessionID: req.sessionID});
      }else if(companyResult!=null){
        if (companyResult.status === 'pending') {
          return res.status(403).send('Your company registration is pending approval.');
        } else if (companyResult.status === 'rejected') {
          return res.status(403).send('Your company registration has been rejected.');
        }
        companyResult.Password='';
        req.session.user=companyResult;
        req.session.role='Company';
        res.status(200).send({UserType: 'Company',User: companyResult});
      }
      else {
        res.status(401).send('Invalid credentials');
        console.log("invalid email or pass");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal server error');
    });
}
function logout(req, res){
  req.session.user = undefined;
  req.session.role = undefined;
  sessions.removeSession(req.headers.sessionid);
  res.status(200).send();
}
function signup(req, res) {
  let newUser = new UserModel({
    Name: req.body.FName.trim()+' '+req.body.LName.trim(),
    Email: req.body.Email.trim(),
    Password: req.body.Password.trim(),
    ProfessionalTitle: req.body.PTitle.trim()
  });
  newUser.save()
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  login,
  logout,
  signup
}