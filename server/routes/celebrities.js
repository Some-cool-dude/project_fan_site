const express =  require('express');  
const celebrityController = require('../controller/celebrityController');  
const router = express.Router();  
  
router.get('/celebrities',celebrityController.getCelebrities)  
  
module.exports = router; 