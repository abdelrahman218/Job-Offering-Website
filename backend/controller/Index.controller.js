const UserModel = require('../models/User.model')
const AdminModel = require('../models/Admin.model.js'); 


function login(req, res) {
  const { usernameOrEmail, password } = req.body;

  // Determine if it's an admin login attempt
  const isAdminLogin = usernameOrEmail.includes('@') ? false : true; 

  if (isAdminLogin) {
    // Admin Login
    AdminModel.findOne({ username: usernameOrEmail })
      .then(admin => {
        if (!admin || !admin.comparePassword(password)) {
          return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        // Generate JWT or session for admin
        const token = generateAdminToken(admin); // Implement token generation
        res.status(200).json({ token, admin: { name: admin.name, email: admin.email, password: admin.password, role: admin.role } });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    // User Login
    UserModel.findOne({ Email: usernameOrEmail })
      .then(user => {
        if (!user || !user.comparePassword(password)) {
          return res.status(401).json({ message: 'Invalid user credentials' });
        }

        // Generate JWT or session for user
        const token = generateUserToken(user); 
        res.status(200).json({ 
          token, 
          user: { 
            id: user._id, 
            name: user.name, 
            email: user.Email, 
            photo: user.ProfilePic, 
            professionalTitle: user.professionalTitle, 
            skills: user.skills, 
            applications: user.applications 
          } 
        }); 
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  }
}

// Helper function to generate JWT or session for admin
function generateAdminToken(admin) {
  // Implement your JWT or session generation logic here
  // Example using JWT:
  const jwtSecret = 'your_admin_secret_key'; // Replace with your actual secret
  const token = jwt.sign({ id: admin._id, role: admin.role }, jwtSecret);
  return token;
}

// Helper function to generate JWT or session for user
function generateUserToken(user) {
  // Implement your JWT or session generation logic here
  // Example using JWT:
  const jwtSecret = 'your_user_secret_key'; // Replace with your actual secret
  const token = jwt.sign({ id: user._id }, jwtSecret);
  return token;
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