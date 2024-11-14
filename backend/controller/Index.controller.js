const UserModel = require('../models/User.model')

function login(req, res) {
  var query = { Email: req.body.Email, Password: req.body.Password };

  let userPromise = Admins.findOne(query);

  Promise.all([userPromise])
    .then(results => {
      let userResult = results[0];

      if (userResult != null) {
        req.session.user = userResult;
        req.session.role = 'User';
        res.redirect('/user');
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

function signup(req, res) {
  let newUser = new UserModel({
    //User Data Scheme with data
  });
  newUser.save()
    .then(() => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  login,
  signup
}