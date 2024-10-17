import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      location,
      sports,
      numberofplayers,
      beginingtime,
      contact,
      level,
      endingtime,
      date,
    } = await request.json();

    // Validation: Ensure all fields are provided
    if (
      !location ||
      !sports ||
      !numberofplayers ||
      !beginingtime ||
      !contact ||
      !level ||
      !endingtime ||
      !date
    ) {
      return NextResponse.json(
        { message: "All Fields are required" },
        { status: 400 }
      );
    }

    // Parse date fields to JavaScript Date objects
    const parsedBeginingTime = new Date(beginingtime);
    const parsedEndingTime = new Date(endingtime);
    const parsedDate = new Date(date);

    // Check if level is a valid enum value
    const validLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
    if (!validLevels.includes(level)) {
      return NextResponse.json(
        { message: "Invalid level provided" },
        { status: 400 }
      );
    }

    // Create new FindPals entry
    const details = await prisma.findPals.create({
      data: {
        location: location,
        numberofplayers: numberofplayers,
        sports: sports,
        beginingtime: parsedBeginingTime,
        endingtime: parsedEndingTime,
        contact: contact,
        level: level, // Enum value
        date: parsedDate,
      },
    });

    // Successful response
    return NextResponse.json(
      { success: true, message: "Details successfully registered", data: details },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error registering Details", error);

    // Error response with error details
    return NextResponse.json(
      { success: false, message: "Error registering details", error: error.message },
      { status: 500 }
    );
  }
}
