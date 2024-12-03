const UserModel = require('../models/User.model')

function login(req, res) {
  var query = { Email: req.body.Email, Password: req.body.Password };

  let userPromise = UserModel.findOne(query);

  Promise.all([userPromise])
    .then(results => {
      let userResult = results[0];

      if (userResult != null) {
        userResult.Password='';
        req.session.user = userResult;
        req.session.role = 'User';
        res.status(200).send({UserType: 'User',User: userResult});
      }
      else {
        res.status(401).send('Invalid credentials');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal server error');
    });
};
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