const express = require('express')
const router = express.Router();
const members = require("../Members");
//const uuid = require('uuid')

//create route that gets members
//use 'router' instead of normal 'app'
//'api/members is sgiven in index, so replaced by '/'

//gets all members
router.get("/", (req, res) => {
    res.json(members);
  });
  
//gets single member
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter((member) => 
        //parseInt for ===
        member.id === parseInt(req.params.id)));
    }else{
        //change status and send message back
        res.status(400).json({msg: `No member with id of ${req.params.id}`})
    }

});

//create member
router.post('/', (req,res)=>{
    const newMember = {
        //generates random id
        //id: uuid.v4(),
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    //if no 'return' then must include 'else'
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: "please include a name and email"})
    }

    members.push(newMember);
    res.json(members);
})

//update member
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updatedMember = req.body;
        members.forEach(member=>{
            if(member.id === parseInt(req.params.id)){
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
            
                return res.json({msg: 'Member updated', member})

            }
        })
        // res.json(members.filter((member) => 
        // //parseInt for ===
        // member.id === parseInt(req.params.id)));
    }else{
        //change status and send message back
        res.status(400).json({msg: `No member with id of ${req.params.id}`})
    }

});

//delete memeber
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg: "Member deleted",
            members: members.filter((member) => 
            //parseInt for ===
            member.id !== parseInt(req.params.id))});
    }else{
        //change status and send message back
        res.status(400).json({msg: `No member with id of ${req.params.id}`})
    }

});

  module.exports = router;