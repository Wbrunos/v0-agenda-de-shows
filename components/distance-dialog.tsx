"use client"

import { Navigation, MapPin, Clock, Car } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface DistanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  destinationCity: string
}

export function DistanceDialog({ open, onOpenChange, destinationCity }: DistanceDialogProps) {
  const [originCity, setOriginCity] = useState("")
  const [distanceData, setDistanceData] = useState<{
    distance: number
    duration: string
    route: string
  } | null>(null)

  const calculateDistance = () => {
    if (!originCity.trim()) return

    // Simulação de cálculo de distância
    const mockDistance = Math.floor(Math.random() * 800) + 100 // 100-900 km
    const mockDuration = `${Math.floor(mockDistance / 80)}h ${Math.floor(Math.random() * 60)}min`
    const mockRoute = `${originCity} → ${destinationCity}`

    setDistanceData({
      distance: mockDistance,
      duration: mockDuration,
      route: mockRoute,
    })
  }

  const resetCalculation = () => {
    setDistanceData(null)
    setOriginCity("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-purple-400 animate-rotate-slow" />
            Calcular Distância
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="origin" className="text-slate-200">
              Cidade de Origem
            </Label>
            <Input
              id="origin"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              placeholder="Digite sua cidade..."
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">Cidade de Destino</Label>
            <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-md border border-slate-600">
              <MapPin className="h-4 w-4 text-red-400" />
              <span className="text-white">{destinationCity}</span>
            </div>
          </div>

          <Button
            onClick={calculateDistance}
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!originCity.trim()}
          >
            <Navigation className="mr-2 h-4 w-4 animate-pulse-glow" />
            Calcular Rota
          </Button>

          {distanceData && (
            <Card className="glass-effect border-slate-600">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2">Resultado da Rota</h3>
                  <div className="text-sm text-slate-400">{distanceData.route}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-xl font-bold text-white">{distanceData.distance} km</div>
                    <div className="text-xs text-slate-400">Distância</div>
                  </div>

                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-xl font-bold text-white">{distanceData.duration}</div>
                    <div className="text-xs text-slate-400">Tempo</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Car className="h-4 w-4" />
                  <span>Estimativa por carro</span>
                </div>

                <Button
                  variant="outline"
                  onClick={resetCalculation}
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Nova Consulta
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="text-xs text-slate-500 text-center">* Cálculo simulado para demonstração</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
