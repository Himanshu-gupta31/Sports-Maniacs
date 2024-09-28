import prisma from "@/lib/db";
import { NextRequest,NextResponse } from "next/server"



export async function POST(request:NextRequest) {
    try {
        const {name,location,email,phone}=await request.json();
        if(!name || !location || !email || !phone){
            return NextResponse.json({success:false,message:"All Fields are Required"},{status:400})

        }
        const newUser= await prisma.user.create({
            data:{
                email:email,
                phonenumber:phone,
                location:location,
                name:name
            }
        });
        return NextResponse.json({success:200,data:newUser})
    } catch (error) {
        console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: "Error creating user" },
      { status: 500 }
    );
    }
}