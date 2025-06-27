"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Key,
  Car,
  Shield,
  DollarSign,
  BarChart3,
  Receipt,
  Music,
  Calendar,
  Users,
  Eye,
  Edit,
  CloudSun,
  Navigation,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface PermissionSettings {
  [feature: string]: {
    view: string[]
    edit: string[]
  }
}

export function SystemParameters() {
  const [apiKeys, setApiKeys] = useState({
    openWeatherKey: "",
    openRouteServiceKey: "",
  })

  const [vehicleSettings, setVehicleSettings] = useState({
    fuelConsumption: "3.5",
    fuelPrice: "5.50",
  })

  const [permissions, setPermissions] = useState<PermissionSettings>({
    "Show Prices": {
      view: ["Master", "Producer", "Manager"],
      edit: ["Master", "Producer"],
    },
    "Finance Dashboard": {
      view: ["Master", "Finance"],
      edit: ["Master", "Finance"],
    },
    "Register Expenses": {
      view: ["Master", "Producer", "Manager", "Band Staff", "Driver"],
      edit: ["Master", "Producer", "Manager", "Band Staff", "Driver"],
    },
    "User Management": {
      view: ["Master"],
      edit: ["Master"],
    },
    "Calendar Management": {
      view: ["Master", "Producer", "Manager"],
      edit: ["Master", "Producer"],
    },
    "Artist Management": {
      view: ["Master", "Producer", "Manager"],
      edit: ["Master", "Producer"],
    },
  })

  const roles = ["Master", "Producer", "Manager", "Band Staff", "Driver", "Finance"]

  const features = [
    {
      id: "Show Prices",
      label: "Show Prices",
      icon: DollarSign,
      description: "View and edit show pricing information",
    },
    {
      id: "Finance Dashboard",
      label: "Finance Dashboard",
      icon: BarChart3,
      description: "Access financial reports and analytics",
    },
    {
      id: "Register Expenses",
      label: "Register Expenses",
      icon: Receipt,
      description: "Record and manage travel expenses",
    },
    { id: "User Management", label: "User Management", icon: Users, description: "Manage system users and accounts" },
    {
      id: "Calendar Management",
      label: "Calendar Management",
      icon: Calendar,
      description: "Schedule and manage shows",
    },
    {
      id: "Artist Management",
      label: "Artist Management",
      icon: Music,
      description: "Manage artist profiles and information",
    },
  ]

  const handlePermissionChange = (feature: string, type: "view" | "edit", role: string, checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [type]: checked ? [...prev[feature][type], role] : prev[feature][type].filter((r) => r !== role),
      },
    }))
  }

  const saveApiKeys = () => {
    // TODO: Save to Supabase or secure storage
    console.log("Saving API keys:", apiKeys)
  }

  const saveVehicleSettings = () => {
    // TODO: Save to Supabase
    console.log("Saving vehicle settings:", vehicleSettings)
  }

  const savePermissions = () => {
    // TODO: Save to Supabase
    console.log("Saving permissions:", permissions)
  }

  const { user } = useAuth()

  // Only Master users can access this component
  if (user?.role !== "Master") {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
        <Card className="bg-[#1f1f1f] border-gray-700 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-4">Only Master users can access System Parameters.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">System Parameters</h2>
          <p className="text-gray-400">Configure system settings, API keys, and user permissions</p>
        </div>

        <Tabs defaultValue="permissions" className="space-y-6">
          <TabsList className="bg-[#1f1f1f] border border-gray-800">
            <TabsTrigger
              value="permissions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
            <TabsTrigger
              value="api-keys"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="vehicle"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              <Car className="h-4 w-4 mr-2" />
              Vehicle Settings
            </TabsTrigger>
          </TabsList>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <Card className="bg-[#1f1f1f] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-blue-400" />
                  Role Permissions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure which roles can view and edit each system feature
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {features.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-blue-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{feature.label}</h3>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-8">
                        {/* View Permissions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Eye className="h-4 w-4 text-green-400" />
                            <h4 className="font-medium text-white">View Access</h4>
                          </div>
                          <div className="space-y-3">
                            {roles.map((role) => (
                              <div key={role} className="flex items-center justify-between">
                                <Label htmlFor={`${feature.id}-view-${role}`} className="text-gray-300">
                                  {role}
                                </Label>
                                <Switch
                                  id={`${feature.id}-view-${role}`}
                                  checked={permissions[feature.id]?.view.includes(role) || false}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(feature.id, "view", role, checked)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Edit Permissions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Edit className="h-4 w-4 text-orange-400" />
                            <h4 className="font-medium text-white">Edit Access</h4>
                          </div>
                          <div className="space-y-3">
                            {roles.map((role) => (
                              <div key={role} className="flex items-center justify-between">
                                <Label htmlFor={`${feature.id}-edit-${role}`} className="text-gray-300">
                                  {role}
                                </Label>
                                <Switch
                                  id={`${feature.id}-edit-${role}`}
                                  checked={permissions[feature.id]?.edit.includes(role) || false}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(feature.id, "edit", role, checked)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-gray-800" />
                    </div>
                  )
                })}

                <Button
                  onClick={savePermissions}
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                >
                  Save Permissions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1f1f1f] border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CloudSun className="h-5 w-5 text-blue-400" />
                    Weather API
                  </CardTitle>
                  <CardDescription className="text-gray-400">OpenWeather API for weather forecasts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openweather-key" className="text-white">
                      OpenWeather API Key
                    </Label>
                    <Input
                      id="openweather-key"
                      type="password"
                      value={apiKeys.openWeatherKey}
                      onChange={(e) => setApiKeys((prev) => ({ ...prev, openWeatherKey: e.target.value }))}
                      placeholder="Enter your OpenWeather API key"
                      className="bg-[#0f0f0f] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500">
                      Get your API key from{" "}
                      <a
                        href="https://openweathermap.org/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        OpenWeatherMap
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1f1f1f] border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Navigation className="h-5 w-5 text-blue-400" />
                    Route API
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    OpenRouteService for distance calculations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openroute-key" className="text-white">
                      OpenRouteService API Key
                    </Label>
                    <Input
                      id="openroute-key"
                      type="password"
                      value={apiKeys.openRouteServiceKey}
                      onChange={(e) => setApiKeys((prev) => ({ ...prev, openRouteServiceKey: e.target.value }))}
                      placeholder="Enter your OpenRouteService API key"
                      className="bg-[#0f0f0f] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500">
                      Get your API key from{" "}
                      <a
                        href="https://openrouteservice.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        OpenRouteService
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={saveApiKeys}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
            >
              Save API Keys
            </Button>
          </TabsContent>

          {/* Vehicle Settings Tab */}
          <TabsContent value="vehicle" className="space-y-6">
            <Card className="bg-[#1f1f1f] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Car className="h-5 w-5 text-blue-400" />
                  Vehicle Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure vehicle parameters for fuel cost calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fuel-consumption" className="text-white">
                      Average Fuel Consumption (km/L)
                    </Label>
                    <Input
                      id="fuel-consumption"
                      type="number"
                      step="0.1"
                      value={vehicleSettings.fuelConsumption}
                      onChange={(e) => setVehicleSettings((prev) => ({ ...prev, fuelConsumption: e.target.value }))}
                      placeholder="3.5"
                      className="bg-[#0f0f0f] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500">Average fuel consumption for tour buses</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuel-price" className="text-white">
                      Fuel Price (R$ per liter)
                    </Label>
                    <Input
                      id="fuel-price"
                      type="number"
                      step="0.01"
                      value={vehicleSettings.fuelPrice}
                      onChange={(e) => setVehicleSettings((prev) => ({ ...prev, fuelPrice: e.target.value }))}
                      placeholder="5.50"
                      className="bg-[#0f0f0f] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500">Current average fuel price in Brazilian Real</p>
                  </div>
                </div>

                <div className="p-4 bg-[#0f0f0f] rounded-lg border border-gray-800">
                  <h4 className="font-medium text-white mb-2">Calculation Preview</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>For a 100km trip:</p>
                    <p>
                      Fuel needed: {(100 / Number.parseFloat(vehicleSettings.fuelConsumption || "3.5")).toFixed(1)}L
                    </p>
                    <p>
                      Estimated cost: R${" "}
                      {(
                        (100 / Number.parseFloat(vehicleSettings.fuelConsumption || "3.5")) *
                        Number.parseFloat(vehicleSettings.fuelPrice || "5.50")
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={saveVehicleSettings}
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
                >
                  Save Vehicle Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
