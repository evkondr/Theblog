const users=[]
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const userSchema=require('./db/User.schema');
const User=mongoose.model('User',userSchema);
const Boom=require('@hapi/boom');


const routes={
    main:(request,h)=>{
        return "This is the main page"
    },
    register:async (request,h)=>{
        const {email,password}=request.payload;
        let uExists=null
        await User.findOne({email},(err,user)=>{
            if(err) return console.log(err);
            uExists=user
        });
        if(uExists) return Boom.notAcceptable("User with this email already exists");
        newUser=new User({email,password})
        newUser.save();
        return h.response(`New user ${newUser.email} has beed created`).code(201)
    },
    login:async(request,h)=>{
        const {email,password}=request.payload

        for(let i=0;i<users.length;i++){
            if(users[i].email==email){
                let isEqual=await bcrypt.compare(password, users[i].password)
                console.log(isEqual);
                if(isEqual){
                    return `Welcome ${users[i].email}`
                }
            }
        }
        return `Bad credentials`
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
    }
}
module.exports=routes