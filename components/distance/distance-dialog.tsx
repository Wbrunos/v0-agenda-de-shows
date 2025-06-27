"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation, MapPin, Clock, Fuel } from "lucide-react"

interface DistanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  destinationCity: string
}

export function DistanceDialog({ open, onOpenChange, destinationCity }: DistanceDialogProps) {
  const [originCity, setOriginCity] = useState("")
  const [routeData, setRouteData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mock settings - replace with real data from Supabase
  const fuelConsumption = 3.5 // km/L
  const fuelPrice = 1.45 // per liter

  const calculateRoute = async () => {
    if (!originCity.trim()) return

    setLoading(true)

    // TODO: Implement OpenRouteService API call
    // Mock calculation
    setTimeout(() => {
      const mockDistance = Math.floor(Math.random() * 800) + 100
      const estimatedLiters = mockDistance / fuelConsumption
      const fuelCost = estimatedLiters * fuelPrice

      setRouteData({
        distance: mockDistance,
        duration: `${Math.floor(mockDistance / 80)}h ${Math.floor(Math.random() * 60)}min`,
        liters: estimatedLiters.toFixed(1),
        cost: fuelCost.toFixed(2),
      })
      setLoading(false)
    }, 1500)
  }

  const resetCalculation = () => {
    setRouteData(null)
    setOriginCity("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Distance & Fuel Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Origin City</Label>
            <Input
              id="origin"
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              placeholder="Enter your current city..."
            />
          </div>

          <div className="space-y-2">
            <Label>Destination</Label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{destinationCity}</span>
            </div>
          </div>

          <Button
            onClick={calculateRoute}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            disabled={!originCity.trim() || loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating...
              </>
            ) : (
              <>
                <Navigation className="mr-2 h-4 w-4" />
                Calculate Route
              </>
            )}
          </Button>

          {routeData && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Route Information</h3>
                  <div className="text-sm text-gray-600">
                    {originCity} → {destinationCity}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-xl font-bold text-blue-600">{routeData.distance} km</div>
                    <div className="text-xs text-gray-600">Distance</div>
                  </div>

                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-green-600">{routeData.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>

                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Fuel className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="text-xl font-bold text-yellow-600">{routeData.liters}L</div>
                    <div className="text-xs text-gray-600">Fuel Needed</div>
                  </div>

                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-purple-600 font-bold">$</span>
                    </div>
                    <div className="text-xl font-bold text-purple-600">${routeData.cost}</div>
                    <div className="text-xs text-gray-600">Fuel Cost</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Based on {fuelConsumption} km/L consumption and ${fuelPrice}/L fuel price
                </div>

                <Button variant="outline" onClick={resetCalculation} className="w-full bg-transparent">
                  New Calculation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
