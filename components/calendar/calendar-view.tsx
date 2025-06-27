"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Filter, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddShowDialog } from "@/components/shows/add-show-dialog"
import { ArtistDialog } from "@/components/artists/artist-dialog"
import { ShowDetailsDialog } from "@/components/shows/show-details-dialog"

interface Artist {
  id: number
  name: string
  genre: string
  color: string
}

interface Show {
  id: number
  title: string
  artist: string
  artistId: number
  date: string
  time: string
  venue: string
  city: string
  status: string
  price?: string
  description?: string
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [isAddShowOpen, setIsAddShowOpen] = useState(false)
  const [isArtistDialogOpen, setIsArtistDialogOpen] = useState(false)
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [isShowDetailsOpen, setIsShowDetailsOpen] = useState(false)

  // Mock data - replace with real data from Supabase
  const [artists, setArtists] = useState<Artist[]>([
    { id: 1, name: "The Midnight", genre: "Synthwave", color: "#3B82F6" },
    { id: 2, name: "Synthwave Dreams", genre: "Electronic", color: "#8B5CF6" },
    { id: 3, name: "Neon Nights", genre: "Retrowave", color: "#EF4444" },
    { id: 4, name: "Electric Pulse", genre: "EDM", color: "#10B981" },
    { id: 5, name: "Retro Future", genre: "Synthpop", color: "#F59E0B" },
  ])

  const [shows, setShows] = useState<Show[]>([
    {
      id: 1,
      title: "Synthwave Night",
      artist: "The Midnight",
      artistId: 1,
      date: "2024-01-15",
      time: "20:00",
      venue: "Blue Note",
      city: "New York",
      status: "confirmed",
      price: "$75",
      description: "An intimate acoustic performance featuring new material.",
    },
    {
      id: 2,
      title: "Electric Dreams",
      artist: "Synthwave Dreams",
      artistId: 2,
      date: "2024-01-18",
      time: "21:30",
      venue: "Electric Ballroom",
      city: "Los Angeles",
      status: "confirmed",
      price: "$85",
      description: "High-energy electronic show with full light production.",
    },
    {
      id: 3,
      title: "Neon Festival",
      artist: "Neon Nights",
      artistId: 3,
      date: "2024-01-22",
      time: "19:00",
      venue: "Neon Arena",
      city: "Miami",
      status: "pending",
      price: "$65",
      description: "Festival performance with special guests.",
    },
    {
      id: 4,
      title: "Pulse Party",
      artist: "Electric Pulse",
      artistId: 4,
      date: "2024-01-25",
      time: "22:00",
      venue: "Club Voltage",
      city: "Chicago",
      status: "confirmed",
      price: "$45",
      description: "Late night club performance.",
    },
    {
      id: 5,
      title: "Future Sounds",
      artist: "Retro Future",
      artistId: 5,
      date: "2024-01-28",
      time: "20:30",
      venue: "Future Hall",
      city: "San Francisco",
      status: "confirmed",
      price: "$70",
      description: "Showcasing new album tracks.",
    },
  ])

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false })
    }

    return days
  }

  const getShowsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return shows.filter((show) => {
      const matchesDate = show.date === dateString
      const matchesArtist = selectedArtist === "all" || show.artistId.toString() === selectedArtist
      return matchesDate && matchesArtist
    })
  }

  const getArtistColor = (artistId: number) => {
    const artist = artists.find((a) => a.id === artistId)
    return artist?.color || "#6B7280"
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const handleAddArtist = (artistData: Omit<Artist, "id">) => {
    const newArtist = {
      id: Math.max(...artists.map((a) => a.id)) + 1,
      ...artistData,
    }
    setArtists([...artists, newArtist])
  }

  const handleUpdateArtist = (updatedArtist: Artist) => {
    setArtists(artists.map((a) => (a.id === updatedArtist.id ? updatedArtist : a)))
  }

  const handleAddShow = (showData: any) => {
    const newShow = {
      id: Math.max(...shows.map((s) => s.id)) + 1,
      ...showData,
      artistId: artists.find((a) => a.name === showData.artist)?.id || 1,
    }
    setShows([...shows, newShow])
  }

  const handleShowClick = (show: Show) => {
    setSelectedShow(show)
    setIsShowDetailsOpen(true)
  }

  const days = getDaysInMonth(currentDate)
  const filteredArtists = selectedArtist === "all" ? artists : artists.filter((a) => a.id.toString() === selectedArtist)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Calendar
          </h2>
          <p className="text-gray-600">Manage your show schedule</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={selectedArtist} onValueChange={setSelectedArtist}>
              <SelectTrigger className="w-[180px] bg-white border-gray-200 hover:border-blue-300 transition-colors">
                <SelectValue placeholder="Filter by artist" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="all" className="hover:bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <span>All Artists</span>
                  </div>
                </SelectItem>
                {artists.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id.toString()} className="hover:bg-blue-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: artist.color }}></div>
                      <span>{artist.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => setIsArtistDialogOpen(true)}
            variant="outline"
            className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-gray-200 hover:border-blue-300 transition-all"
          >
            <Music className="h-4 w-4 mr-2" />
            Manage Artists
          </Button>

          <Button
            onClick={() => setIsAddShowOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Show
          </Button>
        </div>
      </div>

      {/* Artist Legend */}
      {filteredArtists.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium text-gray-700 mr-2">Artists:</span>
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: artist.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{artist.name}</span>
                  <span className="text-xs text-gray-500">({artist.genre})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Days of week header */}
          <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-gray-100">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-4 text-center font-semibold text-gray-700 text-sm border-r border-gray-200 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayShows = getShowsForDate(day.date)
              const todayClass = isToday(day.date) ? "ring-4 ring-yellow-400 ring-opacity-50" : ""
              const hasShows = dayShows.length > 0

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 transition-all hover:bg-gray-50 ${
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50"
                  } ${todayClass}`}
                >
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
                    } ${isToday(day.date) ? "text-yellow-600 font-bold" : ""}`}
                  >
                    {day.date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayShows.map((show) => {
                      const artistColor = getArtistColor(show.artistId)
                      return (
                        <div
                          key={show.id}
                          className="text-xs p-2 rounded-md text-white font-medium cursor-pointer transform hover:scale-105 transition-all shadow-sm hover:shadow-md"
                          style={{
                            backgroundColor: artistColor,
                            background: `linear-gradient(135deg, ${artistColor} 0%, ${artistColor}dd 100%)`,
                          }}
                          title={`${show.artist} - ${show.venue}`}
                          onClick={() => handleShowClick(show)}
                        >
                          <div className="truncate font-semibold">{show.artist}</div>
                          <div className="truncate text-xs opacity-90">{show.time}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddShowDialog open={isAddShowOpen} onOpenChange={setIsAddShowOpen} artists={artists} onAddShow={handleAddShow} />

      <ArtistDialog
        open={isArtistDialogOpen}
        onOpenChange={setIsArtistDialogOpen}
        artists={artists}
        onAddArtist={handleAddArtist}
        onUpdateArtist={handleUpdateArtist}
      />

      {selectedShow && (
        <ShowDetailsDialog open={isShowDetailsOpen} onOpenChange={setIsShowDetailsOpen} show={selectedShow} />
      )}
    </div>
  )
}
