import { NextRequest } from "next/server";
import {User} from '../models/userModel'
import jwt from 'jsonwebtoken'
import { dbConnect } from "@/utils/dbConnect";

await dbConnect()
const Auth = async(req:NextRequest)=>{
    const token = req.cookies.get('token')?.value || req.headers.get("authorization") 
    
    if(!token){
        return {message:"unauthorized request"}
    }

    const decode = jwt.verify(String(token),process.env.JWT_SECURE_KEY || "") as {_id:string}
    
    
    if(!decode)
    {
        return {message:"token expired"}
    }

    const user = await User.findById(String(decode._id ))
    
    if(!user){
        return {message:"user not found"}
    }
    if(user.accessToken !==token){
        return {message:"not  allow multiple device"}
    }
   
    return {user}
}

export {Auth}