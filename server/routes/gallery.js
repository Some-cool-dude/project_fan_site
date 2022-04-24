const express =  require('express');  
const galleryController = require('../controller/galleryController');  
const router = express.Router();  
  
router.get('/gallery',galleryController.getGallery)  
  
module.exports = router; 