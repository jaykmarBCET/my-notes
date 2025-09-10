import { Auth } from "@/authentication/authUser";
import { User } from "@/models/userModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse,NextRequest } from "next/server";

await dbConnect()

export const GET = async(req:NextRequest)=>{
    try {
        const authUser =  await Auth(req)
        if(authUser.message){
            return NextResponse.json(authUser,{status:400})
        }
        const currentUser = await User.findById(authUser.user._id).select("-password")
        if(!currentUser){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        return NextResponse.json(currentUser,{status:200});
    } catch (error) {
        return NextResponse.json({message:"server issus while access current user",error},{status:500})
    }
}