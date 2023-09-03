const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.Mongodb);
const PostsSchema = new mongoose.Schema({
    subject: {type: String},
    descriptions: {type: String},   
    body: {type: String},   
    logo: {type: String},
});
const Posts = mongoose.model("Posts", PostsSchema);
module.exports = {Posts};