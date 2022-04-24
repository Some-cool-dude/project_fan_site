const express =  require('express');  
const userController = require('../controller/userController');  
const router = express.Router();  
  
router.get('/users',userController.getUser);

router.post('/users', userController.createUser);
  
module.exports = router; 