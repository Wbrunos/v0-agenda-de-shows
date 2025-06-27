"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent } from "@/components/ui/card"

const locales = {
  "pt-BR": ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Show {
  id: number
  title: string
  artist: string
  start: Date
  end: Date
  venue: string
  city: string
}

interface ShowCalendarProps {
  shows: Show[]
  onSelectShow: (show: Show) => void
}

export function ShowCalendar({ shows, onSelectShow }: ShowCalendarProps) {
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const events = shows.map((show) => ({
    ...show,
    resource: show,
  }))

  return (
    <Card className="h-[600px] glass-effect border-slate-700">
      <CardContent className="p-4 h-full">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          view={view}
          onView={setView}
          onSelectEvent={(event) => onSelectShow(event.resource)}
          culture="pt-BR"
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            date: "Data",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Nenhum evento neste período",
            showMore: (total) => `+ ${total} mais`,
          }}
          className="text-white"
        />
      </CardContent>
    </Card>
  )
}
