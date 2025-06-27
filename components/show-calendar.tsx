"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface ShowCalendarProps {
  shows: Show[]
  onDateClick: (date: string) => void
}

export function ShowCalendar({ shows, onDateClick }: ShowCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Dias do mês anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true })
    }

    // Dias do próximo mês para completar a grade
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

  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    onDateClick(dateString)
  }

  const days = getDaysInMonth(currentDate)

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <CalendarIcon className="h-5 w-5 text-blue-400 animate-pulse-glow" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
              className="bg-slate-700 border-slate-600 hover:bg-slate-600"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-2 text-center font-medium text-sm text-slate-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayShows = getShowsForDate(day.date)
            const hasShows = dayShows.length > 0
            const isToday = day.date.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  day.isCurrentMonth
                    ? hasShows
                      ? "bg-red-900/30 border-red-500/50 hover:bg-red-800/40"
                      : "bg-green-900/30 border-green-500/50 hover:bg-green-800/40"
                    : "bg-slate-800/50 border-slate-600"
                } ${isToday ? "ring-2 ring-blue-400" : ""}`}
                onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
              >
                <div className={`text-sm font-medium mb-1 ${day.isCurrentMonth ? "text-white" : "text-slate-500"}`}>
                  {day.date.getDate()}
                </div>
                {hasShows && day.isCurrentMonth && (
                  <div className="text-xs text-center">
                    <div className="bg-white/20 rounded px-1 py-0.5">
                      {dayShows.length} show{dayShows.length > 1 ? "s" : ""}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500/50 rounded"></div>
            <span>Dias com shows</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500/50 rounded"></div>
            <span>Dias sem shows</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
