"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Car, MapPin, Fuel } from "lucide-react"

interface FuelCalculatorProps {
  distance: number
  onCalculate: (data: {
    fuelNeeded: number
    fuelCost: number
    totalCost: number
  }) => void
}

export function FuelCalculator({ distance, onCalculate }: FuelCalculatorProps) {
  const [fuelConsumption, setFuelConsumption] = useState("3.5") // km/L for bus
  const [fuelPrice, setFuelPrice] = useState("5.50") // R$ per liter
  const [calculationResult, setCalculationResult] = useState<{
    fuelNeeded: number
    fuelCost: number
    totalCost: number
  } | null>(null)

  const handleCalculate = () => {
    const consumption = Number.parseFloat(fuelConsumption)
    const price = Number.parseFloat(fuelPrice)

    if (consumption > 0 && price > 0 && distance > 0) {
      const fuelNeeded = distance / consumption
      const fuelCost = fuelNeeded * price
      const totalCost = fuelCost // Could include other costs like tolls

      const result = {
        fuelNeeded: Number.parseFloat(fuelNeeded.toFixed(2)),
        fuelCost: Number.parseFloat(fuelCost.toFixed(2)),
        totalCost: Number.parseFloat(totalCost.toFixed(2)),
      }

      setCalculationResult(result)
      onCalculate(result)
    }
  }

  return (
    <Card className="glass-effect border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Fuel className="h-5 w-5 text-orange-400" />
          Calculadora de Combustível
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="consumption" className="text-slate-200">
              Consumo (km/L)
            </Label>
            <Input
              id="consumption"
              type="number"
              step="0.1"
              value={fuelConsumption}
              onChange={(e) => setFuelConsumption(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="3.5"
            />
            <div className="text-xs text-slate-400">Consumo médio do ônibus</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-slate-200">
              Preço do Combustível (R$/L)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="5.50"
            />
            <div className="text-xs text-slate-400">Preço atual por litro</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-sm">Distância: {distance} km</span>
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          disabled={!distance || distance <= 0}
        >
          <Car className="mr-2 h-4 w-4" />
          Calcular Combustível
        </Button>

        {calculationResult && (
          <>
            <Separator className="bg-slate-600" />
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Resultado do Cálculo</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">{calculationResult.fuelNeeded}L</div>
                  <div className="text-xs text-slate-400">Combustível</div>
                </div>

                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-lg font-bold text-green-400">R$ {calculationResult.fuelCost.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">Custo</div>
                </div>

                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-400">R$ {calculationResult.totalCost.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">Total</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 text-center">
                * Cálculo baseado em consumo de {fuelConsumption} km/L e preço de R$ {fuelPrice}/L
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
