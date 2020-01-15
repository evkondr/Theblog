const users=[]
const bcrypt = require('bcryptjs')


const routes={
    main:(request,h)=>{
        return "This is the main page"
    },
    register:async (request,h)=>{
        const {email,password}=request.payload
        for(let i=0;i<users.length;i++){
            if(users[0].email==email){
                return "User with this email already exists"
            }
        }
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        users.push({
            email,
            password:hash
        })
        
        return users
        
        
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
    }
}
module.exports=routes