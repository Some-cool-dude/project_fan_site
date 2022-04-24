const express =  require('express');  
const noteController = require('../controller/noteController');  
const router = express.Router();  
  
router.get('/notes',noteController.getNotes);

router.post('/notes', noteController.createNote);

router.delete('/notes/:id', noteController.deleteNote);

router.put('/notes/:id', noteController.updateNote);
  
module.exports = router; 