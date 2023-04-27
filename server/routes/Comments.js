const express = require('express');
const router = express.Router();
const {Comments}= require('../models/');
//const {validateToken} =require('../middlewares/AuthMiddleware')

router.get('/:postId', async (req,res)=>{
    const postId = req.params.postId;
    const comments = await Comments.findAll({where:{ PostId: postId}});
    res.json(comments);
});

router.post('/', async (req,res)=>{
    const comment = req.body;
    /*const username = req.user.username;
    comment.username = username;*/
    const createComment = await Comments.create(comment);
    res.json(createComment);
})

router.delete("/:commentId", async(req,res)=>{
    const commentId = req.params.commentId;

    await Comments.destroy({where: {
        id: commentId
    },
}) 

    res.json('Deleted ');
})


module.exports = router;