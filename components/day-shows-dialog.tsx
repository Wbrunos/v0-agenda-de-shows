"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, DollarSign, Music } from "lucide-react"

interface Show {
  id: number
  artist: string
  venue: string
  date: string
  time: string
  city: string
  value: string
}

interface DayShowsDialogProps {
  date: string
  shows: Show[]
  isOpen: boolean
  onClose: () => void
}

export function DayShowsDialog({ date, shows, isOpen, onClose }: DayShowsDialogProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Shows em {formatDate(date)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {shows.map((show) => (
            <div key={show.id} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">{show.artist}</h3>
                    <p className="text-slate-300 mb-2">{show.venue}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center text-slate-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {show.time}
                      </div>
                      <div className="flex items-center text-slate-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        {show.city}
                      </div>
                      <div className="flex items-center text-green-400">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {show.value}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-600 bg-transparent"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
