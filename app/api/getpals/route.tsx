import prisma from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";
export async function GET(request:NextRequest) {
    try {
        const getallcard=await prisma.findPals.findMany()
        return NextResponse.json({success:true,message:"All Card Details Fetched Successfully",getallcard},{status:200})
    } catch (error) {
        console.error("Error fetching pals card")
        return NextResponse.json({error:"Error finding people around you"},{status:500})
    }
}