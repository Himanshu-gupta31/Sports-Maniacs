"use client"

import React, { useEffect, useState } from "react"
import { MapPin, Users, Clock, Phone, Award, CalendarDays, Bike } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PalCard {
  location: string
  sports: string
  numberofplayers: string
  beginingtime: Date
  endingtime: Date
  contact: string
  level: string
  date: Date
}

export default function Connectwithpals() {
  const [connectCards, setConnectCards] = useState<PalCard[]>([])

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/getpals")
        const data = await response.json()
        console.log(data)
        setConnectCards(data.getallcard || [])
      } catch (error) {
        console.error("An error occurred while fetching groups:", error)
      }
    }
    fetchCards()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Connect with Pals</h2>
      {connectCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectCards.map((item, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  {item.location}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Bike className="w-4 h-4 mr-2" />
                  <span className="font-medium">{item.sports}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">{item.numberofplayers}</span> Pals Needed
                  </p>
                  <p className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-red-500" />
                    <span className="font-medium">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                    {new Date(item.beginingtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                    {new Date(item.endingtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-purple-500" />
                    {item.contact}
                  </p>
                </div>
                <Badge variant="secondary" className="flex items-center w-fit">
                  <Award className="w-4 h-4 mr-1" />
                  {item.level}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No Pals Request Right Now</p>
      )}
    </div>
  )
}