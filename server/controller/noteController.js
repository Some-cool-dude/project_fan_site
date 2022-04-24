const { Note } = require('../models/note');  
  
const getNotes = async (req,res) => {  
    const { userId, month, year, _sort, _order } = req.query;
    const notes = await Note.find({ userId, month, year }).sort([[_sort, _order==='asc' ? 1 : -1]]);
    return res.status(200).json(notes); 
}

const createNote = async (req, res) => {
    const data = {...req.body};
    data.userId = data.user_id;
    const { id } = await Note.findOne({}).sort([['id', -1]]);
    data.id = id + 1;
    const note = new Note(data);
    await note.save();
    return res.status(201).json(note);
}

const updateNote = async (req, res) => {
    const id = req.params.id
    const { text } = req.body;
    await Note.updateOne({ id }, { text });
    return res.status(200).json({});
}

const deleteNote = async (req, res) => {
    const id = req.params.id
    await Note.findOneAndRemove({ id: +id });
    return res.status(200).json({});
}
  
module.exports = {
    getNotes,
    createNote,
    deleteNote,
    updateNote
}; 