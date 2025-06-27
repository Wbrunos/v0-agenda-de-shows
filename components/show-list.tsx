"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Calendar, MapPin, Clock, DollarSign, Music } from "lucide-react"
import { AddShowDialog } from "@/components/add-show-dialog"

interface Show {
  id: number
  artist: string
  venue: string
  date: string
  time: string
  city: string
  value: string
  status: "confirmed" | "pending" | "cancelled"
}

export function ShowList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const shows: Show[] = [
    {
      id: 1,
      artist: "João Silva",
      venue: "Teatro Municipal",
      date: "2024-01-15",
      time: "20:00",
      city: "São Paulo",
      value: "R$ 5.000",
      status: "confirmed",
    },
    {
      id: 2,
      artist: "Maria Santos",
      venue: "Casa de Shows Rock",
      date: "2024-01-18",
      time: "21:30",
      city: "Rio de Janeiro",
      value: "R$ 3.500",
      status: "pending",
    },
    {
      id: 3,
      artist: "Pedro Costa",
      venue: "Auditório Central",
      date: "2024-01-20",
      time: "19:00",
      city: "Belo Horizonte",
      value: "R$ 4.200",
      status: "confirmed",
    },
    {
      id: 4,
      artist: "Ana Oliveira",
      venue: "Clube do Jazz",
      date: "2024-01-22",
      time: "22:00",
      city: "Porto Alegre",
      value: "R$ 2.800",
      status: "cancelled",
    },
  ]

  const filteredShows = shows.filter(
    (show) =>
      show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Lista de Shows</h1>
          <p className="text-slate-400">Gerencie todos os seus shows agendados</p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Show
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Shows ({filteredShows.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar shows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredShows.map((show) => (
              <div
                key={show.id}
                className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{show.artist}</h3>
                      <p className="text-slate-300">{show.venue}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-slate-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(show.date).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="flex items-center text-sm text-slate-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {show.time}
                        </div>
                        <div className="flex items-center text-sm text-slate-400">
                          <MapPin className="h-4 w-4 mr-1" />
                          {show.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center text-green-400 font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {show.value}
                      </div>
                      <Badge className={`${getStatusColor(show.status)} text-white mt-1`}>
                        {getStatusText(show.status)}
                      </Badge>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddShowDialog isOpen={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  )
}
