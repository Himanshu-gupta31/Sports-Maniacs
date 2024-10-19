"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

export default function Players() {
  const [location, setLocation] = useState<string>("")
  const [sports, setSports] = useState<string>("")
  const [numberofplayers, setNumberofplayers] = useState<string>("")
  const [beginingtime, setBeginingtime] = useState<string>("")
  const [endingtime, setEndingtime] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [level, setLevel] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const availablelevel = ["Beginner", "Intermediate", "Professional"]

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
          beginingtime: new Date(beginingtime),
          endingtime: new Date(endingtime),
          date: new Date(date),
          contact,
          level: prismaLevel,
        }),
      })
      const data = await response.json()
      if (data.success) {
        console.log("Details successfully registered:", data)
        router.push('/connectwithpals')  // Redirect to the Connect with Pals page
      } else {
        console.error("Failed to register details:", data.message)
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  return (
    <div className="w-full min-h-screen p-4 flex justify-center items-center bg-background">
      <div className="border border-input rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Pals</h2>
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
              type="number"
              value={numberofplayers}
              onChange={(e) => setNumberofplayers(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="begintime">Begin Time</Label>
            <Input
              type="datetime-local"
              id="begintime"
              value={beginingtime}
              onChange={(e) => setBeginingtime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endingtime">Ending Time</Label>
            <Input
              type="datetime-local"
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
            <Label htmlFor="level">Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {availablelevel.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Create Request
          </Button>
        </form>
      </div>
    </div>
  )
}