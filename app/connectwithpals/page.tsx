"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Users, Clock, Phone, Award, CalendarDays, Bike } from "lucide-react";

interface Card {
  location: string;
  sports: string;
  numberofplayers: string;
  beginingtime: Date;
  endingtime: Date;
  contact: string;
  level: string;
  date: Date;
}

const sportIcons: { [key: string]: string } = {
  football: "/sports-icons/football.svg",
  basketball: "/sports-icons/basketball.svg",
  tennis: "/sports-icons/tennis.svg",
  volleyball: "/sports-icons/volleyball.svg",
  // Add more sports and their corresponding icon paths
};

export default function Connectwithpals() {
  const [connectcard, setConnectcard] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch("/api/getpals");
        const data = await response.json();
        console.log(data);
        setConnectcard(data.getallcard || []);
      } catch (error) {
        console.error("An error occurred while fetching groups:", error);
      }
    };
    fetchCard();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Connect with Pals</h2>
      {connectcard?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {connectcard.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden  transition-transform duration-300 hover:scale-105 shadow-lg shadow-green-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {item.location}
                    </h3>
                  </div>
                </div>
                  <div className="space-y-2">
                  <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Bike className="w-4 h-4 mr-2 text-neutral-500" />
                    <span className="font-medium">
                      {item.sports}
                    </span>{" "}
                    
                  </p>
                  </div>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium">
                      {item.numberofplayers}
                    </span>{" "}
                    Pals Needed
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
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
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                    {new Date(item.beginingtime).toLocaleTimeString()} -{" "}
                    {new Date(item.endingtime).toLocaleTimeString()}
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 mr-2 text-purple-500" />
                    {item.contact}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Award className="w-4 h-4 mr-1" />
                    {item.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No Pals Request Right Now
        </p>
      )}
    </div>
  );
}
