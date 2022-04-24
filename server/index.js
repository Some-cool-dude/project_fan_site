const express = require('express'); 
const mongoose = require('mongoose'); 
const userRoutes = require('./routes/users');
const celebrityRoutes = require('./routes/celebrities');
const galleryRoutes = require('./routes/gallery');
const noteRoutes = require('./routes/notes');
const postRoutes = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/appDb',{useNewUrlParser:true})  
.then(()=>console.log('connected to database')).catch(error=>console.log('error occured',error))

const app = express()  

app.use(express.json());

app.use('/api/', [userRoutes, celebrityRoutes, galleryRoutes, noteRoutes, postRoutes]);
  
const port = 3000;  
  
app.listen(port,()=>console.log(`server running at port ${port}`))  
  
module.exports = app;