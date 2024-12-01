const mongoose=require('mongoose');
const schema=mongoose.Schema;

const ApplicationSchema=new schema({
    Applicant: {type: String, match:/[a-zA-Z0-9]*[@]+[a-z]+[.]+[a-z]{3}/, required: true},
    Company: {type: String, required: true},
    Post: {type: String, required: true},
    CV: {type: String, required: true},
    State: {type: String, default: 'Submitted'}
},{timestamps: true});

const Application=mongoose.model('Application',ApplicationSchema);
module.exports=Application;