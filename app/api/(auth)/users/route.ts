import { NextResponse } from "next/server";
import User from "../../../../lib/models/user";
import Connect from "../../../../lib/dbConnect.js"
import {Types, types} from "mongoose"

const ObjectId=require("mongoose").Types.ObjectId;

export const GET=async()=>{
    try {
        await Connect();
        const Users=await User.find();
        return NextResponse.json(Users,{status:200});
    } catch (error:any) {
        return NextResponse.json(error.message)
        
    }
}

export const POST=async (request:Request)=>{
    try {
        await Connect();
        const user=await User.create(await request.json());
        return NextResponse.json(user,{status:201});
    } catch (error:any) {
        return NextResponse.json(error.message,{status:400});
    }
}


export const PATCH=async (request:Request)=>{
   try{
    const data=await request.json();
    const{userId,Username}=data;
    Connect();
    console.log(data,userId,Username);
    if(!userId || !Username) {
        NextResponse.json({message:"userId and username are required"})
    }
    if(!Types.ObjectId.isValid(userId)) {
        NextResponse.json({message:"userId is not valid"});
    
   }
    try {
        const Updateduser=await User.findOneAndUpdate(
            {_id:new ObjectId(userId)},
            {username:Username},
            {new:true},

        )
        if(!Updateduser) NextResponse.json({message: "User not found"})
        return NextResponse.json(Updateduser,{message:"user has been updated"},{status:200});
        
    } catch (error:any) {
        return NextResponse.json(error.message,{status:400});
        
    }
} catch (error:any) {
    return NextResponse.json(error.message,{status:400});
    
}
}



export const DELETE=async (request:Request)=>{
    try{
    const {searchParams}=new URL(request.url);
    const userId=searchParams.get("userId");
     Connect();
     console.log(userId);
     if(!userId) {
         NextResponse.json({message:"userId and username are required"})
     }
     if(!Types.ObjectId.isValid(userId)) {
         NextResponse.json({message:"userId is not valid"});
     
    }
     try {
         const deleteUser=await User.findByIdAndDelete(
            new Types.ObjectId(userId)
         )
         if(!deleteUser) NextResponse.json({message: "User not found"})
         return NextResponse.json(deleteUser,{message:"user has been updated"},{status:200});
         
     } catch (error:any) {
         return NextResponse.json(error.message,{status:400});
         
     }
 } catch (error:any) {
     return NextResponse.json(error.message,{status:400});
     
 }
 }