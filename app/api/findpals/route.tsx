import prisma from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";
export async function POST(request:NextRequest) {
    try {
        const {location,sports,numberofplayers,beginingtime,contact,level,endingtime,date}=await request.json()
        if(!location || !sports || !numberofplayers || !beginingtime || !contact || !level ||!endingtime || !date){
            return NextResponse.json({message:"All Fields are required"})
        }
        const details=await prisma.findPals.create({
            data:{
                location:location,
                numberofplayers:numberofplayers,
                sports:sports,
                beginingtime:beginingtime,
                endingtime:endingtime,
                contact:contact,
                level:level,
                date:date
            }
        });
        return NextResponse.json({success:true,message:"Details succesfully registered",data:details},{status:200})
    } catch (error) {
        console.error("Error registering Details",error)
        return NextResponse.json({success:false,message:"Error registering Details"},{status:500})
    }
}