const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    userid: mongoose.ObjectId,
    name: String,
    surname: String,
    email: String,
    password: String,
    rgisterdate: Date
})
module.exports=userSchema