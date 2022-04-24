const express =  require('express');  
const postController = require('../controller/postController');  
const router = express.Router();  
  
router.get('/posts',postController.getPosts);

router.get('/posts/:id', postController.getSinglePost);

router.post('/posts', postController.createPost);

router.put('/posts/:id', postController.updatePost);

router.delete('/posts/:id', postController.deletePost);
  
module.exports = router; 