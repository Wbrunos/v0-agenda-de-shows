"use client"

import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  city: string
  date: string
}

export function WeatherDialog({ open, onOpenChange, city, date }: WeatherDialogProps) {
  // Simulação de dados meteorológicos
  const mockWeatherData = {
    temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
    humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    condition: ["Ensolarado", "Parcialmente nublado", "Nublado", "Chuva leve"][Math.floor(Math.random() * 4)],
    precipitation: Math.floor(Math.random() * 30), // 0-30%
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Ensolarado":
        return <Sun className="h-12 w-12 text-yellow-400 animate-pulse-glow" />
      case "Parcialmente nublado":
        return <Cloud className="h-12 w-12 text-gray-400 animate-float" />
      case "Nublado":
        return <Cloud className="h-12 w-12 text-gray-500 animate-float" />
      case "Chuva leve":
        return <CloudRain className="h-12 w-12 text-blue-400 animate-bounce-slow" />
      default:
        return <Sun className="h-12 w-12 text-yellow-400" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-400 animate-float" />
            Previsão do Tempo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">{city}</h3>
            <p className="text-sm text-slate-400">{formatDate(date)}</p>
          </div>

          <Card className="glass-effect border-slate-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">{getWeatherIcon(mockWeatherData.condition)}</div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">{mockWeatherData.temperature}°C</div>
                <div className="text-slate-300">{mockWeatherData.condition}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  <div>
                    <div className="text-sm text-slate-400">Umidade</div>
                    <div className="font-semibold text-white">{mockWeatherData.humidity}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-slate-400">Vento</div>
                    <div className="font-semibold text-white">{mockWeatherData.windSpeed} km/h</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-400" />
                  <div>
                    <div className="text-sm text-slate-400">Chuva</div>
                    <div className="font-semibold text-white">{mockWeatherData.precipitation}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-red-400" />
                  <div>
                    <div className="text-sm text-slate-400">Sensação</div>
                    <div className="font-semibold text-white">{mockWeatherData.temperature + 2}°C</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-xs text-slate-500 text-center">* Previsão simulada para demonstração</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
