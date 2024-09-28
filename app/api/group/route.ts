import prisma from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const communities=await prisma.community.findMany()
        return NextResponse.json({success:true,message:"All Communities Fethced",communities},{status:200})
    } catch (error) {
        console.error("Error fetching Communities",error)
        return NextResponse.json({error: "Failed to fetch communities"},{status:500})
    }
}