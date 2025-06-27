"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddShowDialog } from "@/components/shows/add-show-dialog"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [isAddShowOpen, setIsAddShowOpen] = useState(false)

  // Mock data - replace with real data from Supabase
  const artists = [
    { id: 1, name: "The Midnight", color: "#3B82F6" },
    { id: 2, name: "Synthwave Dreams", color: "#8B5CF6" },
    { id: 3, name: "Neon Nights", color: "#EF4444" },
  ]

  const shows = [
    {
      id: 1,
      artist: "The Midnight",
      date: "2024-01-15",
      venue: "Blue Note",
      color: "#3B82F6",
    },
    {
      id: 2,
      artist: "Synthwave Dreams",
      date: "2024-01-18",
      venue: "Electric Ballroom",
      color: "#8B5CF6",
    },
  ]

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
    return shows.filter((show) => show.date === dateString)
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

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-600">Manage your show schedule</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedArtist} onValueChange={setSelectedArtist}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by artist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              {artists.map((artist) => (
                <SelectItem key={artist.id} value={artist.name}>
                  {artist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => setIsAddShowOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Show
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayShows = getShowsForDate(day.date)
              const todayClass = isToday(day.date) ? "bg-blue-100 border-blue-500" : ""

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg ${
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50"
                  } ${todayClass} hover:bg-gray-50 transition-colors`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
                    } ${isToday(day.date) ? "text-blue-600" : ""}`}
                  >
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayShows.map((show) => (
                      <div
                        key={show.id}
                        className="text-xs p-1 rounded text-white font-medium truncate"
                        style={{ backgroundColor: "#DC2626" }} // Bright red for show blocks
                        title={`${show.artist} - ${show.venue}`}
                      >
                        {show.artist}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <AddShowDialog open={isAddShowOpen} onOpenChange={setIsAddShowOpen} artists={artists} />
    </div>
  )
}
