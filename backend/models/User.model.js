const mongoose=require('mongoose');
const schema=mongoose.Schema;

const UserSchema=new schema({
    ProfilePic: {type: String},
    Name: {type: String, match:/([A-ZÀ-ÿ-a-z. ']+[ ]*)+/, required: true},
    Email: {type: String, match:/[a-zA-Z0-9]*[@]+[a-z]+[.]+[a-z]{3}/, unique:true, required: true},
    Password: {type:String, match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}/,required: true},
    ProfessionalTitle: {type: String, match:/([A-ZÀ-ÿ-a-z. ']+[ ]*)+/},
    Skills: {type:Array, default:[]}
},{timestamps: true});

const User=mongoose.model('User',UserSchema);
module.exports=User;