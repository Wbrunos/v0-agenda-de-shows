"use client"

import { useState } from "react"
import { MoreHorizontal, MapPin, Clock, DollarSign, Edit, Trash2, Eye, Music, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShowDetailsDialog } from "./show-details-dialog"
import { EditShowDialog } from "./edit-show-dialog"

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

interface ShowListProps {
  shows: Show[]
  onUpdateShow: (show: Show) => void
}

export function ShowList({ shows, onUpdateShow }: ShowListProps) {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

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

  const handleViewDetails = (show: Show) => {
    setSelectedShow(show)
    setIsDetailsOpen(true)
  }

  const handleEdit = (show: Show) => {
    setSelectedShow(show)
    setIsEditOpen(true)
  }

  const handleUpdateShow = (updatedShow: Show) => {
    onUpdateShow(updatedShow)
    setIsEditOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => (
          <Card
            key={show.id}
            className="glass-effect border-slate-700 hover:bg-slate-700/30 transition-all hover:scale-[1.02]"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Music className="h-5 w-5 text-blue-400 animate-pulse-glow" />
                    {show.title}
                  </CardTitle>
                  <CardDescription className="font-medium text-slate-300">{show.artist}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-700 border-slate-600">
                    <DropdownMenuItem onClick={() => handleViewDetails(show)} className="text-white hover:bg-slate-600">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(show)} className="text-white hover:bg-slate-600">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-slate-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge className={getStatusColor(show.status)} variant="secondary">
                {getStatusText(show.status)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-slate-300">
                <Clock className="mr-2 h-4 w-4 text-green-400" />
                {new Date(show.date).toLocaleDateString("pt-BR")} às {show.time}
              </div>
              <div className="flex items-center text-sm text-slate-300">
                <MapPin className="mr-2 h-4 w-4 text-red-400" />
                {show.venue}, {show.city}
              </div>
              <div className="flex items-center text-sm text-slate-300">
                <DollarSign className="mr-2 h-4 w-4 text-yellow-400" />
                {show.price}
              </div>
              {show.observation && (
                <div className="flex items-start text-sm text-slate-300">
                  <FileText className="mr-2 h-4 w-4 text-orange-400 mt-0.5" />
                  <span className="text-xs line-clamp-2">{show.observation}</span>
                </div>
              )}
              <div className="text-xs text-slate-400 text-center pt-2">
                Capacidade: {show.capacity.toLocaleString()} pessoas
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedShow && (
        <>
          <ShowDetailsDialog show={selectedShow} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
          <EditShowDialog
            show={selectedShow}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onUpdateShow={handleUpdateShow}
          />
        </>
      )}
    </div>
  )
}
