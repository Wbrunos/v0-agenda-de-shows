"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react"

interface WeatherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  city: string
  date: string
}

export function WeatherDialog({ open, onOpenChange, city, date }: WeatherDialogProps) {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mock weather data - replace with OpenWeather API call
  const mockWeatherData = {
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    precipitation: 20,
    description: "Partly cloudy with a chance of light rain in the evening",
  }

  useEffect(() => {
    if (open) {
      setLoading(true)
      // TODO: Implement OpenWeather API call
      setTimeout(() => {
        setWeatherData(mockWeatherData)
        setLoading(false)
      }, 1000)
    }
  }, [open])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-12 w-12 text-yellow-500" />
      case "Partly Cloudy":
        return <Cloud className="h-12 w-12 text-gray-500" />
      case "Rainy":
        return <CloudRain className="h-12 w-12 text-blue-500" />
      default:
        return <Sun className="h-12 w-12 text-yellow-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather Forecast
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : weatherData ? (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{city}</h3>
              <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">{getWeatherIcon(weatherData.condition)}</div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-2">{weatherData.temperature}°C</div>
                  <div className="text-gray-600">{weatherData.condition}</div>
                  <p className="text-sm text-gray-500 mt-2">{weatherData.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-600">Humidity</div>
                      <div className="font-semibold">{weatherData.humidity}%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Wind</div>
                      <div className="font-semibold">{weatherData.windSpeed} km/h</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-600">Rain</div>
                      <div className="font-semibold">{weatherData.precipitation}%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <div>
                      <div className="text-sm text-gray-600">Feels like</div>
                      <div className="font-semibold">{weatherData.temperature + 2}°C</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
