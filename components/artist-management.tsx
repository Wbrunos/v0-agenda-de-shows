"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Music, Phone, Mail, MapPin } from "lucide-react"
import { AddArtistDialog } from "@/components/add-artist-dialog"

interface Artist {
  id: number
  name: string
  genre: string
  phone: string
  email: string
  city: string
  status: "active" | "inactive"
  totalShows: number
  totalEarnings: string
}

export function ArtistManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const artists: Artist[] = [
    {
      id: 1,
      name: "João Silva",
      genre: "Rock",
      phone: "(11) 99999-9999",
      email: "joao@email.com",
      city: "São Paulo",
      status: "active",
      totalShows: 15,
      totalEarnings: "R$ 45.000",
    },
    {
      id: 2,
      name: "Maria Santos",
      genre: "MPB",
      phone: "(21) 88888-8888",
      email: "maria@email.com",
      city: "Rio de Janeiro",
      status: "active",
      totalShows: 12,
      totalEarnings: "R$ 38.500",
    },
    {
      id: 3,
      name: "Pedro Costa",
      genre: "Jazz",
      phone: "(31) 77777-7777",
      email: "pedro@email.com",
      city: "Belo Horizonte",
      status: "active",
      totalShows: 8,
      totalEarnings: "R$ 22.400",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      genre: "Pop",
      phone: "(51) 66666-6666",
      email: "ana@email.com",
      city: "Porto Alegre",
      status: "inactive",
      totalShows: 5,
      totalEarnings: "R$ 15.200",
    },
  ]

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-500" : "bg-red-500"
  }

  const getStatusText = (status: string) => {
    return status === "active" ? "Ativo" : "Inativo"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Artistas</h1>
          <p className="text-slate-400">Gerencie todos os artistas cadastrados</p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Artista
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Artistas ({filteredArtists.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar artistas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{artist.name}</h3>
                      <p className="text-sm text-slate-400">{artist.genre}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(artist.status)} text-white`}>
                    {getStatusText(artist.status)}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-400">
                    <Phone className="h-4 w-4 mr-2" />
                    {artist.phone}
                  </div>
                  <div className="flex items-center text-sm text-slate-400">
                    <Mail className="h-4 w-4 mr-2" />
                    {artist.email}
                  </div>
                  <div className="flex items-center text-sm text-slate-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {artist.city}
                  </div>
                </div>

                <div className="border-t border-slate-600 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Shows:</span>
                    <span className="text-white font-medium">{artist.totalShows}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-400">Receita:</span>
                    <span className="text-green-400 font-medium">{artist.totalEarnings}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-600 bg-transparent"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-600 bg-transparent"
                  >
                    Ver Shows
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddArtistDialog isOpen={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  )
}
