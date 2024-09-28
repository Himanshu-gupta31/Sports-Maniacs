"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
function Profile() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-background w-screen">
      <div className="flex flex-col w-full p-8 justify-center items-center">
        <h1 className="text-4xl text-center font-bold">Join Our Community</h1>
        <div className="border border-black dark:border-white w-1/2 p-4 mt-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 w-full">
              <Label>Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                id="location"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Profile;
