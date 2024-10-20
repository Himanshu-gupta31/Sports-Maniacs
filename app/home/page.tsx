"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface Group {
  id: string
  name: string
  sports: string
  location: string
  grouplink: string
}

export default function HomePage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [groups, setGroups] = useState<Group[]>([])

  const availablelocation = ["East Delhi", "North Delhi", "South Delhi", "West Delhi"]

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/group")
        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.statusText}`)
        }
        const data = await response.json()
        console.log(data)
        setGroups(data.communities || [])
      } catch (error) {
        console.error("An error occurred while fetching groups:", error)
      }
    }

    fetchGroups()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, location, email }),
      })

      const data = await response.json()

      if (data.success) {
        console.log("User registered successfully:", data)
        // Reset form or perform other actions
      } else {
        console.error("Failed to register user:", data.message)
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  const filteredGroups = location ? groups.filter((group) => group.location === location) : groups

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Sports Connect</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold">Join the Community</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full bg-background border border-input h-10 rounded-md px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Locations</option>
                  {availablelocation.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
              <Link href={"https://chat.whatsapp.com/Lw0u7DsUAoWHn5PU8yHGGo"}>
              <Button type="submit" className="w-full">
                Join Now
              </Button>
              </Link>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Available Groups</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <Card key={group.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl">{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sports: {group.sports}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Location: {group.location}
                      </p>
                      <Button className="mt-4 w-full" onClick={() => window.open(group.grouplink)}>
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center col-span-full">No groups available</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}