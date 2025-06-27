"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Key, Car, Shield } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    openWeatherKey: "",
    openRouteServiceKey: "",
    fuelConsumption: "3.5",
    fuelPrice: "1.45",
    permissions: {
      finance: {
        view: ["Master", "Finance"],
        edit: ["Master", "Finance"],
      },
      showValues: {
        view: ["Master", "Producer", "Manager"],
        edit: ["Master", "Producer"],
      },
      expenses: {
        view: ["Master", "Producer", "Manager", "Finance"],
        edit: ["Master", "Producer", "Manager", "Band Staff", "Driver"],
      },
      parameters: {
        view: ["Master"],
        edit: ["Master"],
      },
    },
  })

  const roles = ["Master", "Producer", "Manager", "Band Staff", "Driver", "Finance"]

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePermissionChange = (section: string, type: string, role: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: {
          ...prev.permissions[section],
          [type]: checked
            ? [...prev.permissions[section][type], role]
            : prev.permissions[section][type].filter((r) => r !== role),
        },
      },
    }))
  }

  const saveSettings = () => {
    // TODO: Save to Supabase
    console.log("Saving settings:", settings)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">System Parameters</h2>
        <p className="text-gray-600">Configure system settings and permissions</p>
      </div>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle Settings</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Configure external service API keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openweather">OpenWeather API Key</Label>
                <Input
                  id="openweather"
                  type="password"
                  value={settings.openWeatherKey}
                  onChange={(e) => handleSettingChange("openWeatherKey", e.target.value)}
                  placeholder="Enter your OpenWeather API key"
                />
                <p className="text-xs text-gray-500">
                  Get your API key from{" "}
                  <a
                    href="https://openweathermap.org/api"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    OpenWeatherMap
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openroute">OpenRouteService API Key</Label>
                <Input
                  id="openroute"
                  type="password"
                  value={settings.openRouteServiceKey}
                  onChange={(e) => handleSettingChange("openRouteServiceKey", e.target.value)}
                  placeholder="Enter your OpenRouteService API key"
                />
                <p className="text-xs text-gray-500">
                  Get your API key from{" "}
                  <a
                    href="https://openrouteservice.org/"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    OpenRouteService
                  </a>
                </p>
              </div>

              <Button
                onClick={saveSettings}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Save API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Configuration
              </CardTitle>
              <CardDescription>Configure vehicle parameters for fuel calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consumption">Fuel Consumption (km/L)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    step="0.1"
                    value={settings.fuelConsumption}
                    onChange={(e) => handleSettingChange("fuelConsumption", e.target.value)}
                    placeholder="3.5"
                  />
                  <p className="text-xs text-gray-500">Average fuel consumption for your vehicle</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Fuel Price (per liter)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={settings.fuelPrice}
                    onChange={(e) => handleSettingChange("fuelPrice", e.target.value)}
                    placeholder="1.45"
                  />
                  <p className="text-xs text-gray-500">Current fuel price in your currency</p>
                </div>
              </div>

              <Button
                onClick={saveSettings}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Save Vehicle Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role Permissions
              </CardTitle>
              <CardDescription>Configure which roles can view and edit each section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(settings.permissions).map(([section, perms]) => (
                <div key={section} className="space-y-4">
                  <h3 className="text-lg font-semibold capitalize">{section.replace(/([A-Z])/g, " $1")}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">View Access</h4>
                      <div className="space-y-2">
                        {roles.map((role) => (
                          <div key={role} className="flex items-center space-x-2">
                            <Switch
                              id={`${section}-view-${role}`}
                              checked={perms.view.includes(role)}
                              onCheckedChange={(checked) => handlePermissionChange(section, "view", role, checked)}
                            />
                            <Label htmlFor={`${section}-view-${role}`}>{role}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Edit Access</h4>
                      <div className="space-y-2">
                        {roles.map((role) => (
                          <div key={role} className="flex items-center space-x-2">
                            <Switch
                              id={`${section}-edit-${role}`}
                              checked={perms.edit.includes(role)}
                              onCheckedChange={(checked) => handlePermissionChange(section, "edit", role, checked)}
                            />
                            <Label htmlFor={`${section}-edit-${role}`}>{role}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={saveSettings}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Save Permissions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
