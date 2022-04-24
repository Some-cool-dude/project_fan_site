const { User } = require('../models/user');  
  
const getUser = async (req,res) => {  
    const { email } = req.query;
    const users = await User.find({ email });
    return res.status(200).json(users); 
}

const createUser = async (req, res) => {
    const data = {...req.body};
    const { id } = await User.findOne({}).sort([['id', -1]]);
    data.id = id + 1;
    const user = new User(data);
    await user.save();
    return res.status(201).json(user);
}
  
module.exports = {
    getUser,
    createUser
}; 