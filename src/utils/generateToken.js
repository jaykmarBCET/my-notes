import jwt from 'jsonwebtoken'
import {User} from '../models/userModel'


const generate = async(userId)=>{
    
    const user = await User.findById(userId)
    
    if(!user){
        throw Error("User not found")
    }
    return jwt.sign({_id:user._id,email:user.email,name:user.name},process.env.JWT_SECURE_KEY,{expiresIn:'7d'})
     
    
}

export default generate;