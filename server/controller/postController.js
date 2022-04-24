const { Post } = require('../models/post');  
  
const getPosts = async (req,res) => {  
    const { title_like = '', _limit, _page, _sort, _order } = req.query;
    const count = await Post.find({ title: { $regex: title_like } }).count();
    res.header('x-total-count', count);
    const posts = await Post.find({ title: { $regex: title_like } }).skip((_page - 1) * _limit).limit(_limit).sort([[_sort, _order==='asc' ? 1 : -1]]);
    return res.status(200).json(posts); 
}

const getSinglePost = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findOne({ id });
    return res.status(200).json(post);
}

const createPost = async (req, res) => {
    const data = {...req.body};
    const { id } = await Post.findOne({}).sort([['id', -1]]);
    data.id = id + 1;
    const post = new Post(data);
    await post.save();
    return res.status(201).json(post);
}

const updatePost = async (req, res) => {
    const id = req.params.id
    await Post.updateOne({ id }, req.body);
    return res.status(200).json({});
}

const deletePost = async (req, res) => {
    const id = req.params.id
    await Post.findOneAndRemove({ id: +id });
    return res.status(200).json({});
}
  
module.exports = {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}; 