const users=[]
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const userSchema=require('./db/User.schema');
const User=mongoose.model('User',userSchema);
const Boom=require('@hapi/boom');
const  jwt=require('jsonwebtoken');


const routes={
    main:(request,h)=>{
        return "This is the main page"
    },
    register:async (request,h)=>{
        const {email,password}=request.payload;
        let uExists=null;
        let hashedPass;
        await User.findOne({email},(err,user)=>{
            if(err) return console.log(err);
            uExists=user
        });
        if(uExists) return Boom.notAcceptable("User with this email already exists");
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                newUser=new User({email,password:hash});
                newUser.save();
            });
        });
        return h.response(`New user has beed created`).code(201)
    },
    login:async(request,h)=>{
        const {email,password}=request.payload
        let isUser=null;
        let isEqual=false;
        await User.findOne({email},(err,user)=>{
            if(err) return console.log(err);
            isUser=user;
            console.log(isUser)
        });
        if(!isUser){
            return Boom.unauthorized('invalid credentials');
        }
        isEqual=await bcrypt.compare(password, isUser.password)
        if(!isEqual){
            return Boom.unauthorized('invalid credentials');
        }
        const token=jwt.sign({userId:isUser._id},'secret',{ expiresIn: '1h' })
        return token;
    },
    users:async(request,h)=>{
        let allUsers=null;
        await User.find((err,users)=>{
            if(err)return console.log(err);
            allUsers=users;
        })
        return allUsers
    },
    deleteUser:async(request,h)=>{
        const {email}=request.payload;
        let isFound=null
        await User.findOneAndDelete({email},(err, user)=>{
            if(err)return console.log(err);
            isFound=user
        })
        if(!isFound){
            return Boom.notFound(`User with email ${email} not found`)
        }
        return h.response(`User with email ${email} has been deleted`)
    },
    administrator:async(request,h)=>{
        return "OK"
    }
}
module.exports=routes