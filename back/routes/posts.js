var express = require('express');
const { Posts } = require('../schemas/posts');
var router = express.Router();

router.post('/newpost/', async (req, res) => {
  const NewPosts = await Posts.create(req.body)
  await NewPosts.save()
  res.send(NewPosts);
});
router.get('/allposts/',async (req,res)=>{
const allposts = await (await Posts.find({}).select('-body').limit(10))
allposts.reverse()
res.send({allposts})
})
router.get('/post/',async (req,res)=>{
  let id = req.query.id;
  const post = await (await Posts.findOne({_id:id}))
  res.send({post})
})

module.exports = router;
