"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Navigation, MapPin, Clock, DollarSign, Music } from "lucide-react"
import { WeatherDialog } from "@/components/weather/weather-dialog"
import { DistanceDialog } from "@/components/distance/distance-dialog"

export function ShowDetails() {
  const [selectedShow, setSelectedShow] = useState(null)
  const [isWeatherOpen, setIsWeatherOpen] = useState(false)
  const [isDistanceOpen, setIsDistanceOpen] = useState(false)

  // Mock data - replace with real data from Supabase
  const shows = [
    {
      id: 1,
      artist: "The Midnight",
      venue: "Blue Note",
      date: "2024-01-15",
      time: "20:00",
      city: "New York",
      price: 75.0,
      description: "An intimate acoustic performance featuring new material from their upcoming album.",
    },
    {
      id: 2,
      artist: "Synthwave Dreams",
      venue: "Electric Ballroom",
      date: "2024-01-18",
      time: "21:30",
      city: "Los Angeles",
      price: 85.0,
      description: "High-energy electronic show with full light production and special guests.",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Show Details</h2>
        <p className="text-gray-600">View and manage show information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => (
          <Card key={show.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{show.artist}</CardTitle>
                  <CardDescription>{show.venue}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(show.date).toLocaleDateString()} at {show.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {show.city}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />${show.price}
                </div>
              </div>

              <p className="text-sm text-gray-700">{show.description}</p>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsWeatherOpen(true)} className="flex-1">
                  <Cloud className="h-4 w-4 mr-2" />
                  Weather
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsDistanceOpen(true)} className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Distance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <WeatherDialog open={isWeatherOpen} onOpenChange={setIsWeatherOpen} city="New York" date="2024-01-15" />

      <DistanceDialog open={isDistanceOpen} onOpenChange={setIsDistanceOpen} destinationCity="New York" />
    </div>
  )
}
