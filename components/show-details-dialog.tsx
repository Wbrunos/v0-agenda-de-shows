"use client"

import { MapPin, Clock, DollarSign, Calendar, Music, FileText, Cloud, Navigation } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { WeatherDialog } from "./weather-dialog"
import { DistanceDialog } from "./distance-dialog"
import { useState } from "react"

interface Show {
  id: number
  title: string
  artist: string
  date: string
  time: string
  venue: string
  city: string
  status: string
  price: string
  capacity: number
  sold: number
  observation?: string
}

interface ShowDetailsDialogProps {
  show: Show
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShowDetailsDialog({ show, open, onOpenChange }: ShowDetailsDialogProps) {
  const [isWeatherOpen, setIsWeatherOpen] = useState(false)
  const [isDistanceOpen, setIsDistanceOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const revenue = Number.parseFloat(show.price.replace("R$ ", "").replace(",", "")) * show.sold

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-blue-400 animate-pulse-glow" />
              {show.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{show.artist}</h3>
              <Badge className={getStatusColor(show.status)} variant="secondary">
                {getStatusText(show.status)}
              </Badge>
            </div>

            <Separator className="bg-slate-600" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-slate-200">
                  {new Date(show.date).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWeatherOpen(true)}
                  className="ml-auto text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                >
                  <Cloud className="h-4 w-4 animate-float" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-slate-200">{show.time}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-slate-200">{show.venue}</span>
              </div>

              <div className="flex items-center gap-3">
                <Navigation className="h-4 w-4 text-purple-400" />
                <button
                  onClick={() => setIsDistanceOpen(true)}
                  className="text-slate-200 hover:text-blue-400 underline transition-colors"
                >
                  {show.city}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-yellow-400" />
                <span className="text-slate-200">{show.price}</span>
              </div>

              {show.observation && (
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-orange-400 mt-0.5" />
                  <span className="text-slate-200 text-sm">{show.observation}</span>
                </div>
              )}
            </div>

            <Separator className="bg-slate-600" />

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Informações do Evento</h4>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 glass-effect rounded-lg border-slate-600">
                  <div className="text-2xl font-bold text-green-400">R$ {(revenue / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-slate-400">Receita Atual</div>
                </div>
                <div className="text-center p-3 glass-effect rounded-lg border-slate-600">
                  <div className="text-2xl font-bold text-blue-400">{show.capacity.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Capacidade Total</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <WeatherDialog open={isWeatherOpen} onOpenChange={setIsWeatherOpen} city={show.city} date={show.date} />

      <DistanceDialog open={isDistanceOpen} onOpenChange={setIsDistanceOpen} destinationCity={show.city} />
    </>
  )
}
