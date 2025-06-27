"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music, MapPin, Clock, DollarSign, Search, Filter, Edit, Trash2 } from "lucide-react"

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
}

interface ShowListProps {
  shows: Show[]
  onEditShow: (show: Show) => void
  onDeleteShow: (showId: number) => void
  onViewDetails: (show: Show) => void
}

export function ShowList({ shows, onEditShow, onDeleteShow, onViewDetails }: ShowListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

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

  const filteredShows = shows
    .filter((show) => {
      const matchesSearch =
        show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.city.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || show.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "artist":
          return a.artist.localeCompare(b.artist)
        case "venue":
          return a.venue.localeCompare(b.venue)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="glass-effect border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar shows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="artist">Artista</SelectItem>
                <SelectItem value="venue">Local</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center text-slate-300">
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm">{filteredShows.length} show(s)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shows List */}
      <div className="grid gap-4">
        {filteredShows.map((show) => (
          <Card key={show.id} className="glass-effect border-slate-700 hover:bg-slate-700/50 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Music className="h-5 w-5 text-blue-400" />
                        {show.title}
                      </h3>
                      <p className="text-slate-300 font-medium">{show.artist}</p>
                    </div>
                    <Badge className={getStatusColor(show.status)} variant="secondary">
                      {getStatusText(show.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-slate-300">
                      <Clock className="mr-2 h-4 w-4 text-blue-400" />
                      {new Date(show.date).toLocaleDateString("pt-BR")} às {show.time}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <MapPin className="mr-2 h-4 w-4 text-red-400" />
                      {show.venue}, {show.city}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <DollarSign className="mr-2 h-4 w-4 text-green-400" />
                      {show.price}
                    </div>
                    <div className="flex items-center text-slate-300">
                      <span className="mr-2">🎫</span>
                      {show.sold}/{show.capacity} vendidos
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(show)}
                    className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-600"
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditShow(show)}
                    className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteShow(show.id)}
                    className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredShows.length === 0 && (
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-8 text-center">
              <Music className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Nenhum show encontrado</h3>
              <p className="text-slate-400">Tente ajustar os filtros ou adicionar um novo show.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
