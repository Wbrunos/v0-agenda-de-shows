"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { DayShowsDialog } from "@/components/day-shows-dialog"
import { AddShowDialog } from "@/components/add-show-dialog"

interface Show {
  id: number
  artist: string
  venue: string
  date: string
  time: string
  city: string
  value: string
}

export function ShowCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Mock data - shows agendados
  const shows: Show[] = [
    {
      id: 1,
      artist: "João Silva",
      venue: "Teatro Municipal",
      date: "2024-01-15",
      time: "20:00",
      city: "São Paulo",
      value: "R$ 5.000",
    },
    {
      id: 2,
      artist: "Maria Santos",
      venue: "Casa de Shows Rock",
      date: "2024-01-15",
      time: "21:30",
      city: "Rio de Janeiro",
      value: "R$ 3.500",
    },
    {
      id: 3,
      artist: "Pedro Costa",
      venue: "Auditório Central",
      date: "2024-01-18",
      time: "19:00",
      city: "Belo Horizonte",
      value: "R$ 4.200",
    },
  ]

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

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

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
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDate.toISOString().split("T")[0],
      })
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day).toISOString().split("T")[0]
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate,
      })
    }

    // Dias do próximo mês
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: nextDate.toISOString().split("T")[0],
      })
    }

    return days
  }

  const getShowsForDate = (date: string) => {
    return shows.filter((show) => show.date === date)
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

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Calendário</h1>
          <p className="text-slate-400">Visualize e gerencie seus shows</p>
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
            <CardTitle className="text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const dayShows = getShowsForDate(day.fullDate)
              const hasShows = dayShows.length > 0

              return (
                <div
                  key={index}
                  className={`
                    min-h-[80px] p-2 border border-slate-700 cursor-pointer transition-colors
                    ${day.isCurrentMonth ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-900 text-slate-600"}
                    ${hasShows ? "ring-2 ring-blue-500" : ""}
                  `}
                  onClick={() => hasShows && setSelectedDate(day.fullDate)}
                >
                  <div className="text-sm text-white mb-1">{day.date}</div>
                  {hasShows && (
                    <div className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded">
                      {dayShows.length} show{dayShows.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <DayShowsDialog
          date={selectedDate}
          shows={getShowsForDate(selectedDate)}
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}

      <AddShowDialog isOpen={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  )
}
