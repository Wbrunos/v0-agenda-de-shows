"use client"

import { useState } from "react"
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Music,
  FileText,
  Cloud,
  Navigation,
  Users,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { WeatherDialog } from "./weather-dialog"
import { DistanceDialog } from "./distance-dialog"

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

interface ShowDetailsPageProps {
  show: Show
  onBack: () => void
}

export function ShowDetailsPage({ show, onBack }: ShowDetailsPageProps) {
  const [isWeatherOpen, setIsWeatherOpen] = useState(false)
  const [isDistanceOpen, setIsDistanceOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const revenue = Number.parseFloat(show.price.replace("R$ ", "").replace(",", "")) * show.sold
  const occupancyRate = (show.sold / show.capacity) * 100

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{show.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h2 className="text-lg md:text-xl text-slate-300">{show.artist}</h2>
                <Badge className={`${getStatusColor(show.status)} border w-fit`}>{getStatusText(show.status)}</Badge>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Show Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="glass-effect border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Music className="h-5 w-5 text-blue-400" />
                    Informações do Show
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-200">
                      <Calendar className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="font-medium">{formatDate(show.date)}</div>
                        <div className="text-sm text-slate-400">Data do Show</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200">
                      <Clock className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="font-medium">{show.time}</div>
                        <div className="text-sm text-slate-400">Horário de Início</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200">
                      <MapPin className="h-5 w-5 text-red-400" />
                      <div>
                        <div className="font-medium">{show.venue}</div>
                        <div className="text-sm text-slate-400">{show.city}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200">
                      <DollarSign className="h-5 w-5 text-yellow-400" />
                      <div>
                        <div className="font-medium">{show.price}</div>
                        <div className="text-sm text-slate-400">Preço do Ingresso</div>
                      </div>
                    </div>
                  </div>

                  {show.observation && (
                    <>
                      <Separator className="bg-slate-600" />
                      <div className="flex items-start gap-3 text-slate-200">
                        <FileText className="h-5 w-5 text-purple-400 mt-0.5" />
                        <div>
                          <div className="font-medium mb-2">Observações</div>
                          <div className="text-sm text-slate-300 leading-relaxed">{show.observation}</div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => setIsWeatherOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white h-12"
                >
                  <Cloud className="mr-2 h-5 w-5" />
                  Previsão do Tempo
                </Button>

                <Button
                  onClick={() => setIsDistanceOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12"
                >
                  <Navigation className="mr-2 h-5 w-5" />
                  Calcular Distância
                </Button>
              </div>
            </div>

            {/* Right Column - Statistics */}
            <div className="space-y-6">
              {/* Revenue Card */}
              <Card className="glass-effect border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Receita
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">R$ {(revenue / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-slate-400">Receita Atual</div>
                  </div>
                </CardContent>
              </Card>

              {/* Capacity Card */}
              <Card className="glass-effect border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Users className="h-5 w-5 text-blue-400" />
                    Ocupação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{show.sold.toLocaleString()}</div>
                    <div className="text-sm text-slate-400">de {show.capacity.toLocaleString()} lugares</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Ocupação</span>
                      <span>{occupancyRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {(show.capacity - show.sold).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400">lugares disponíveis</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-effect border-slate-700 p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-400">{show.price}</div>
                    <div className="text-xs text-slate-400">Preço Médio</div>
                  </div>
                </Card>

                <Card className="glass-effect border-slate-700 p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400">
                      {Math.ceil((new Date(show.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-xs text-slate-400">Dias Restantes</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <WeatherDialog open={isWeatherOpen} onOpenChange={setIsWeatherOpen} city={show.city} date={show.date} />
      <DistanceDialog open={isDistanceOpen} onOpenChange={setIsDistanceOpen} destinationCity={show.city} />
    </>
  )
}
