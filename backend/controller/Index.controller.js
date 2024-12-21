const UserModel = require('../models/User.model')
const companyModel=require('../models/Company.model')
function login(req, res) {
  var query = { Email: req.body.Email, Password: req.body.Password };
  let companyPromise=companyModel.findOne(query);
  let userPromise = UserModel.findOne(query);
  Promise.all([userPromise ,companyPromise])
    .then(results => {
      let userResult = results[0];
      let companyResult=results[1];
      if (userResult != null) {
        userResult.Password='';
        req.session.role = 'User';
        res.status(200).send({UserType: 'User',User: userResult});
      }else if(companyResult!=null){
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