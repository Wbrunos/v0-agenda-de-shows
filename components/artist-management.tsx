"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, Edit, Trash2, Music2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddArtistDialog } from "./add-artist-dialog"

interface Artist {
  id: number
  name: string
  genre: string
  country: string
}

interface ArtistManagementProps {
  artists: Artist[]
  onAddArtist: (artist: Omit<Artist, "id">) => void
  onUpdateArtist: (artist: Artist) => void
}

export function ArtistManagement({ artists, onAddArtist, onUpdateArtist }: ArtistManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Gestão de Artistas</h3>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4 animate-bounce-slow" />
          Novo Artista
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <Card
            key={artist.id}
            className="glass-effect border-slate-700 hover:bg-slate-700/30 transition-all hover:scale-[1.02]"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2 text-white">
                    <Music2 className="h-5 w-5 text-purple-400 animate-float" />
                    {artist.name}
                  </CardTitle>
                  <CardDescription className="text-slate-300">{artist.country}</CardDescription>
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
                    <DropdownMenuItem className="text-white hover:bg-slate-600">
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
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-3 bg-slate-700 text-slate-200">
                {artist.genre}
              </Badge>
              <div className="text-sm text-slate-400">Artista ativo no sistema</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddArtistDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddArtist={onAddArtist} />
    </div>
  )
}
