"use client"

import { Music, Clock, MapPin, DollarSign, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShowDetailsDialog } from "./show-details-dialog"
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

interface DayShowsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: string
  shows: Show[]
}

export function DayShowsDialog({ open, onOpenChange, date, shows }: DayShowsDialogProps) {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [isShowDetailsOpen, setIsShowDetailsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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

  const handleArtistClick = (show: Show) => {
    setSelectedShow(show)
    setIsShowDetailsOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Music className="h-6 w-6 text-blue-400 animate-pulse-glow" />
              Shows do dia {formatDate(date)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {shows.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum show agendado para este dia</p>
              </div>
            ) : (
              shows.map((show) => (
                <Card
                  key={show.id}
                  className="glass-effect border-slate-600 cursor-pointer hover:bg-slate-700/50 transition-all hover:scale-[1.02]"
                  onClick={() => handleArtistClick(show)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Music className="h-5 w-5 text-blue-400 animate-float" />
                          {show.artist}
                        </CardTitle>
                        <p className="text-slate-300 font-medium">{show.title}</p>
                      </div>
                      <Badge className={getStatusColor(show.status)} variant="secondary">
                        {getStatusText(show.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-slate-300">
                        <Clock className="mr-2 h-4 w-4 text-blue-400" />
                        {show.time}
                      </div>
                      <div className="flex items-center text-slate-300">
                        <DollarSign className="mr-2 h-4 w-4 text-green-400" />
                        {show.price}
                      </div>
                      <div className="flex items-center text-slate-300 col-span-2">
                        <MapPin className="mr-2 h-4 w-4 text-red-400" />
                        {show.venue}, {show.city}
                      </div>
                      {show.observation && (
                        <div className="flex items-start text-slate-300 col-span-2">
                          <FileText className="mr-2 h-4 w-4 text-yellow-400 mt-0.5" />
                          <span className="text-xs">{show.observation}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedShow && (
        <ShowDetailsDialog show={selectedShow} open={isShowDetailsOpen} onOpenChange={setIsShowDetailsOpen} />
      )}
    </>
  )
}
