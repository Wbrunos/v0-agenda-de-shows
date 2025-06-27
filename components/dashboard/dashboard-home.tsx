"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Music, DollarSign, TrendingUp, Plus, MapPin } from "lucide-react"

export function DashboardHome() {
  const stats = [
    {
      title: "Shows Este Mês",
      value: "12",
      description: "+2 desde o mês passado",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Artistas Ativos",
      value: "8",
      description: "3 novos este mês",
      icon: Music,
      color: "text-purple-500",
    },
    {
      title: "Receita Total",
      value: "R$ 45.200",
      description: "+15% desde o mês passado",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Taxa de Ocupação",
      value: "85%",
      description: "Acima da média",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  const upcomingShows = [
    {
      id: 1,
      artist: "João Silva",
      venue: "Teatro Municipal",
      date: "2024-01-15",
      time: "20:00",
      value: "R$ 5.000",
    },
    {
      id: 2,
      artist: "Maria Santos",
      venue: "Casa de Shows XYZ",
      date: "2024-01-18",
      time: "21:30",
      value: "R$ 3.500",
    },
    {
      id: 3,
      artist: "Pedro Costa",
      venue: "Clube da Música",
      date: "2024-01-20",
      time: "19:00",
      value: "R$ 4.200",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Visão geral do seu sistema de agendamento</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Show
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-slate-400">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Shows */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Próximos Shows</CardTitle>
          <CardDescription className="text-slate-400">Shows agendados para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingShows.map((show) => (
              <div key={show.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Music className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{show.artist}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="h-3 w-3" />
                      {show.venue}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{show.value}</p>
                  <p className="text-slate-400 text-sm">
                    {show.date} às {show.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
