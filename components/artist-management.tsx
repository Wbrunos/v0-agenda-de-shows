"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Music, Plus, Search, Edit, Trash2, Users } from "lucide-react"
import { AddArtistDialog } from "./add-artist-dialog"

interface Artist {
  id: number
  name: string
  genre: string
  color: string
  totalShows?: number
  upcomingShows?: number
  revenue?: number
}

export function ArtistManagement() {
  const [artists, setArtists] = useState<Artist[]>([
    {
      id: 1,
      name: "The Midnight",
      genre: "Synthwave",
      color: "#3B82F6",
      totalShows: 12,
      upcomingShows: 3,
      revenue: 45000,
    },
    {
      id: 2,
      name: "Synthwave Dreams",
      genre: "Electronic",
      color: "#8B5CF6",
      totalShows: 8,
      upcomingShows: 2,
      revenue: 32000,
    },
    {
      id: 3,
      name: "Neon Nights",
      genre: "Retrowave",
      color: "#EF4444",
      totalShows: 15,
      upcomingShows: 4,
      revenue: 67000,
    },
    {
      id: 4,
      name: "Electric Pulse",
      genre: "EDM",
      color: "#10B981",
      totalShows: 6,
      upcomingShows: 1,
      revenue: 18000,
    },
    {
      id: 5,
      name: "Retro Future",
      genre: "Synthpop",
      color: "#F59E0B",
      totalShows: 10,
      upcomingShows: 2,
      revenue: 38000,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddArtist = (artistData: Omit<Artist, "id">) => {
    const newArtist = {
      id: Math.max(...artists.map((a) => a.id)) + 1,
      ...artistData,
      totalShows: 0,
      upcomingShows: 0,
      revenue: 0,
    }
    setArtists([...artists, newArtist])
  }

  const handleDeleteArtist = (artistId: number) => {
    setArtists(artists.filter((a) => a.id !== artistId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gerenciamento de Artistas
          </h2>
          <p className="text-gray-600">Gerencie artistas e suas informações</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar artistas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Artista
          </Button>
        </div>
      </div>

      {/* Artists Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total de Artistas</p>
                <p className="text-2xl font-bold text-blue-900">{artists.length}</p>
              </div>
              <Music className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Shows Agendados</p>
                <p className="text-2xl font-bold text-green-900">
                  {artists.reduce((sum, artist) => sum + (artist.upcomingShows || 0), 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Shows Realizados</p>
                <p className="text-2xl font-bold text-purple-900">
                  {artists.reduce((sum, artist) => sum + (artist.totalShows || 0), 0)}
                </p>
              </div>
              <Music className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Receita Total</p>
                <p className="text-2xl font-bold text-yellow-900">
                  R$ {(artists.reduce((sum, artist) => sum + (artist.revenue || 0), 0) / 1000).toFixed(0)}k
                </p>
              </div>
              <span className="text-2xl">💰</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => (
          <Card key={artist.id} className="hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: artist.color }}
                  >
                    {artist.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{artist.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {artist.genre}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => handleDeleteArtist(artist.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Shows Realizados</p>
                    <p className="font-semibold">{artist.totalShows || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Próximos Shows</p>
                    <p className="font-semibold">{artist.upcomingShows || 0}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Receita Total</p>
                  <p className="font-semibold text-lg text-green-600">
                    R$ {((artist.revenue || 0) / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArtists.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum artista encontrado</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Tente ajustar o termo de busca" : "Adicione seu primeiro artista para começar"}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Artista
            </Button>
          </CardContent>
        </Card>
      )}

      <AddArtistDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddArtist={handleAddArtist} />
    </div>
  )
}
