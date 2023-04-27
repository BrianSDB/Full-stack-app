const express = require('express');
const router = express.Router();
const {Likes} = require('../models');

router.post("/",async (req,res) =>{
    const {PostId} = req.body;

    const found = await Likes.findOne({where: {PostId: PostId}})
    if(!found) {    
        await Likes.create({PostId: PostId })
        res.json({liked:true}); 
    } else {
        await Likes.destroy({
            where: {PostId: PostId}
        })
        res.json({liked: false}); 
    }
   
})

module.exports = router;