"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Music, DollarSign, TrendingUp, Clock, MapPin } from "lucide-react"

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
      title: "Taxa de Crescimento",
      value: "23%",
      description: "Comparado ao ano passado",
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
      city: "São Paulo",
      value: "R$ 5.000",
    },
    {
      id: 2,
      artist: "Maria Santos",
      venue: "Casa de Shows Rock",
      date: "2024-01-18",
      time: "21:30",
      city: "Rio de Janeiro",
      value: "R$ 3.500",
    },
    {
      id: 3,
      artist: "Pedro Costa",
      venue: "Auditório Central",
      date: "2024-01-20",
      time: "19:00",
      city: "Belo Horizonte",
      value: "R$ 4.200",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Visão geral do seu sistema de agendamento</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
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
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{show.artist}</h3>
                    <p className="text-sm text-slate-400">{show.venue}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-xs text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {show.date} às {show.time}
                      </div>
                      <div className="flex items-center text-xs text-slate-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {show.city}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-400">{show.value}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
