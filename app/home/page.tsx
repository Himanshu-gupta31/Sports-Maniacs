"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Define the Group interface
interface Group {
  id: string;
  name: string;
  sports: string;
  location: string;
}
interface availablelocation {
  items: any;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [groups, setGroups] = useState<Group[]>([]); // Use the Group[] type for groups state
  const availablelocation = [
    "East Delhi",
    "North Delhi",
    "South Delhi",
    "West Delhi",
  ];
  console.log(availablelocation);
  // Fetch groups when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/group");
        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setGroups(data.communities || []);
      } catch (error) {
        console.error("An error occurred while fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, location, email }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("User registered successfully:", data);
        // Reset form or perform other actions
      } else {
        console.error("Failed to register user:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Sports Connect</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Join the Community</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="mt-1">
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full bg-neutral-300 h-[3rem] rounded-lg px-4"
                  >
                    {availablelocation.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Join Now
              </Button>
            </form>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-6">Available Groups</h2>
            <div className="grid gap-4">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <CardTitle>{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sports: {group.sports}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Location: {group.location}
                      </p>
                      <Button className="mt-4 w-full">Join Group</Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No groups available</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}