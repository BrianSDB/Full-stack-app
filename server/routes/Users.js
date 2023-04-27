const express = require('express');
const router = express.Router();
const {Users}= require('../models');
const bcrypt = require('bcrypt');
const{sign}=require('jsonwebtoken')
//const{validateToken} = require('../middlewares/AuthMiddleware.js');



router.post('/',async (req,res)=>{
   
   const {username,password} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash
        })
        res.json('Success!')
    })
    
})

router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    const user = await Users.findOne({where: { username: username}});

    if(user) {
        bcrypt.compare(password,user.password).then((same)=>{
            if(!same) {
                return res.json({error:"Wrong username or passsword"});
            }
            const accessToken = sign({username:user.username,id:user.id},"importantsecret" );
            return res.json(accessToken);
        })
    }else{
        return res.json({error:"User does not exist"});
    }
    

    
})

router.get('/basicinfo/:id',async (req,res) =>{
    const id =req.params.id;

    const basicInfo = await Users.findByPk(id,
    {attributes: {exclude: ["password"]},
});
    res.json(basicInfo);
})

router.put('/changepassword',async (req,res)=>{
    const {oldPassword,newPassword} = req.body;
    const user = await Users.findOne({where: { username: username}});

    bycrypt.compare(oldPassword,user.password).then(async(same) =>{
        if(!same) res.json({error: "Password doesn't match"});

        bcrypt.hash(newPassword, 10).then((hash)=>{
             Users.update({password: hash},{where: {username:username}})
            res.json('Success!')
        });
            
    }); 
});



module.exports = router;