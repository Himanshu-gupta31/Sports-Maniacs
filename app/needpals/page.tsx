"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Players() {
  const [location, setLocation] = useState<string>("");
  const [sports, setSports] = useState<string>("");
  const [numberofplayers, setNumberofplayers] = useState<string>("");
  const [beginingtime, setBeginingtime] = useState<string>("");
  const [endingtime, setEndingtime] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const availablelevel = ["Beginner", "Intermediate", "Professional"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prismaLevel = level.toUpperCase()
    try {
      const response = await fetch("/api/findpals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          sports,
          numberofplayers,
          beginingtime: new Date(beginingtime),  // Convert to DateTime
          endingtime: new Date(endingtime),      // Convert to DateTime
          contact,
          level:prismaLevel,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Details successfully registered:", data);
        // Reset form or perform other actions
      } else {
        console.error("Failed to register details:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-black p-8 rounded-lg w-[32rem]  dark:border dark:border-white shadow-green-300 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sports">Sports</Label>
            <Input
              id="sports"
              value={sports}
              onChange={(e) => setSports(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numberofplayers">Number Of Pals Needed</Label>
            <Input
              id="numberofplayers"
              value={numberofplayers}
              onChange={(e) => setNumberofplayers(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="begintime">Begin Time</Label>
            <Input
              type="datetime-local"   // Ensure the correct input type
              id="begintime"
              value={beginingtime}
              onChange={(e) => setBeginingtime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endingtime">Ending Time</Label>
            <Input
              type="datetime-local"   // Ensure the correct input type
              id="endingtime"
              value={endingtime}
              onChange={(e) => setEndingtime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Level</option>
              {availablelevel.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Create Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default Players;
