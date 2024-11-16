function addSkill(req,res){
    const users=require('../models/User.model');
    const userEmail=req.body.Email;
    const skill=req.body.Skill;
    let newSkills=users.findOne({Email: userEmail})?.Skills;
    if(newSkills){
        newSkills=[...newSkills,skill];
        users.findOneAndUpdate({Email: userEmail},{Skills: newSkills});
        res.status(200).send();
    }
    else{
        res.status(402).send('User Not Found');
    }
}
function removeSkill(req,res){
    const users=require('../models/User.model');
    const userEmail=req.body.Email;
    const skill=req.body.Skill;
    let newSkills=users.findOne({Email: userEmail})?.Skills;
    if(newSkills){
        newSkills=newSkills.filter((sk)=>sk!==skill);
        users.findOneAndUpdate({Email: userEmail},{Skills: newSkills});
        res.status(200).send();
    }
    else{
        res.status(402).send('User Not Found');
    }
}

module.exports={
    addSkill,
    removeSkill
}