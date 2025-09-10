import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import {Page} from '@/models/PageModel'
import { Auth } from "@/authentication/authUser";


await dbConnect()

export const POST = async(req:NextRequest)=>{
    try {
        const authUser = await Auth(req)
        if(authUser?.message){
            return NextResponse.json(authUser)
        }
        if(!authUser.user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        
        
        const {title,content,id} = await req.json()
        const subjectId = id;
        if(!subjectId || !content || !title){
            return NextResponse.json({message:"All field are required"},{status:400})
        }

        const newContent = await Page.create({subjectId,title,content})
        if(!newContent){
            return NextResponse.json({message:"server issus Please try again"},{status:500})
        }
        const currentContent = await Page.findById(newContent._id);
        return NextResponse.json(currentContent,{status:200})
    } catch (error) {
        return NextResponse.json({message:"server issus",error},{status:500})
        
    }
}
export const GET = async(req:NextRequest)=>{
    try {
        const authUser = await Auth(req)
        if(authUser?.message){
            return NextResponse.json(authUser)
        }
        if(!authUser.user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        const subjectId = (new URL(req.url)).searchParams.get("id")
        const allContent = await Page.find({subjectId})
        return NextResponse.json(allContent,{status:200})
    } catch (error) {
        return NextResponse.json({message:"server issus",error},{status:500})
        
    }

}
export const PUT = async(req:NextRequest)=>{
    try {
        const authUser = await Auth(req)
        if(authUser?.message){
            return NextResponse.json(authUser)
        }
        if(!authUser.user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        const {title,content} = await req.json()
        const contentId = (new URL(req.url)).searchParams.get("contentId")
        if(!contentId)return NextResponse.json({message:"content id required"},{status:400})
        const updateContent = await Page.findByIdAndUpdate(contentId,{title,content},{new:true})
        return NextResponse.json(updateContent,{status:200})

    } catch (error) {
        return NextResponse.json({message:"server issus",error},{status:500})
        
    }

}

export const DELETE = async(req:NextRequest)=>{
    try {
        const authUser = await Auth(req)
        if(authUser?.message){
            return NextResponse.json(authUser)
        }
        if(!authUser.user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        const contentId = (new URL(req.url)).searchParams.get("contentId")
        if(!contentId) return NextResponse.json({message:"content id required"},{status:400})
        const deleteContent = await Page.findByIdAndDelete(contentId)
        if(!deleteContent)return NextResponse.json({message:"Content ont found"},{status:404})
        return NextResponse.json({message:"Content deleted successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"server issus",error},{status:500})
        
    }

}