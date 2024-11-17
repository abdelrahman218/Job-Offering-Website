async function addSkill(req,res){
    const users=require('../models/User.model');
    const userEmail=req.body.Email;
    const skill=req.body.Skill;
    let user=await users.findOne({Email: userEmail});
    //Responds with an error if User is not in the database
    if(!user){
        res.status(402).send('User Not Found');
        return;
    }
    let newSkills=user.Skills;
    //Responds with an error if skill already exists
    if(newSkills.includes(skill)){
        res.status(400).send('Skill already exists');
        return;
    }
    newSkills=[...newSkills,skill];
    await users.findOneAndUpdate({Email: userEmail},{Skills: newSkills});
    res.status(200).send();
}
async function removeSkill(req,res){
    const users=require('../models/User.model');
    const userEmail=req.body.Email;
    const skill=req.body.Skill;
    let user=await users.findOne({Email: userEmail});
    //Responds with an error if User is not in the database
    if(!user){
        res.status(402).send('User Not Found');
        return;
    }    
    let newSkills=user.Skills;
    //Responds with an error if skill is not found
    if(!newSkills.includes(skill)){
        res.status(400).send('Skill isn\'t found');
        return;
    }    
    newSkills=newSkills.filter((sk)=>sk!==skill);
    await users.findOneAndUpdate({Email: userEmail},{Skills: newSkills});
    res.status(200).send();
}

module.exports={
    addSkill,
    removeSkill
}