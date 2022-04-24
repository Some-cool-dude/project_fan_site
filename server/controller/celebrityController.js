const { Celebrity } = require('../models/celebrity');  
  
const getCelebrities = async (req,res) => {  
    const { _limit, link } = req.query;
    let find = {};
    if (link) {
        find = { link };
    }

    const celebrities = await Celebrity.find(find).limit(_limit);
    if (!celebrities.length) return res.status(404);
    return res.status(200).json(celebrities); 
}
  
module.exports = {
    getCelebrities
}; 