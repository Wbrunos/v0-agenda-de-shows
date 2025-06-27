"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Music, Edit, Trash2 } from "lucide-react"

export function ArtistManagement() {
  const [artists, setArtists] = useState([
    { id: 1, name: "The Midnight", genre: "Synthwave", color: "#3B82F6" },
    { id: 2, name: "Synthwave Dreams", genre: "Electronic", color: "#8B5CF6" },
    { id: 3, name: "Neon Nights", genre: "Retrowave", color: "#EF4444" },
  ])

  const [newArtist, setNewArtist] = useState({
    name: "",
    genre: "",
    color: "#3B82F6",
  })

  const [isEditing, setIsEditing] = useState(false)

  const genres = [
    "Synthwave",
    "Electronic",
    "Retrowave",
    "Pop",
    "Rock",
    "Jazz",
    "Classical",
    "Hip Hop",
    "R&B",
    "Country",
  ]

  const colors = [
    "#3B82F6",
    "#8B5CF6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#6366F1",
    "#14B8A6",
    "#F97316",
    "#84CC16",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      // Update existing artist
      setIsEditing(false)
    } else {
      // Add new artist
      const artist = {
        id: artists.length + 1,
        ...newArtist,
      }
      setArtists([...artists, artist])
    }
    setNewArtist({ name: "", genre: "", color: "#3B82F6" })
  }

  const handleEdit = (artist: any) => {
    setNewArtist(artist)
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    setArtists(artists.filter((artist) => artist.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Artist Management</h2>
        <p className="text-gray-600">Manage your artists and their information</p>
      </div>

      {/* Add/Edit Artist Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {isEditing ? "Edit Artist" : "Add New Artist"}
          </CardTitle>
          <CardDescription>
            {isEditing ? "Update artist information" : "Register a new artist in the system"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Artist Name</Label>
                <Input
                  id="name"
                  value={newArtist.name}
                  onChange={(e) => setNewArtist((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter artist name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select
                  value={newArtist.genre}
                  onValueChange={(value) => setNewArtist((prev) => ({ ...prev, genre: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color Theme</Label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      newArtist.color === color ? "border-gray-900" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewArtist((prev) => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isEditing ? "Update Artist" : "Add Artist"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setNewArtist({ name: "", genre: "", color: "#3B82F6" })
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Artists List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Artists</CardTitle>
          <CardDescription>Manage your artist roster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <div key={artist.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: artist.color }}
                    >
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{artist.name}</h3>
                      <p className="text-sm text-gray-600">{artist.genre}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(artist)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(artist.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: artist.color, opacity: 0.3 }} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
