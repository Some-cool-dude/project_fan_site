const { Gallery } = require('../models/gallery');  
  
const getGallery = async (req,res) => {  
    const { _limit, _page } = req.query;
    const gallery = await Gallery.find({}).skip((_page - 1) * _limit).limit(10);
    return res.status(200).json(gallery.map(item=>item.img)); 
}
  
module.exports = {
    getGallery
}; 