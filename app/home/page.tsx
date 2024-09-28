'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [email,setEmail]=useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response= await fetch("/api/user",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({ name, phone, location, email }),
        })
        const data=await response.json()
        if (data.success) {
            console.log('User registered successfully:', data)
            
          } else {
            console.error('Failed to register user:', data.message)
            
          }
    } catch (error) {
        console.error('An error occurred:', error)
    }
    
  }

  const groups = [
    { id: 1, name: 'Soccer Sundays', members: 15, location: 'Central Park' },
    { id: 2, name: 'Basketball Nights', members: 10, location: 'Community Center' },
    { id: 3, name: 'Tennis Club', members: 8, location: 'City Courts' },
    { id: 4, name: 'Volleyball Beach', members: 12, location: 'Sunny Beach' },
  ]

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
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Join Now</Button>
            </form>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-6">Available Groups</h2>
            <div className="grid gap-4">
              {groups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Members: {group.members}</p>
                    <p className="text-sm text-muted-foreground">Location: {group.location}</p>
                    <Button className="mt-4 w-full">Join Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}