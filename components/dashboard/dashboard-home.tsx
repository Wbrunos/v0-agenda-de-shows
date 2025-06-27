"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Music, DollarSign, TrendingUp, MapPin } from "lucide-react"

export function DashboardHome() {
  // Mock data - replace with real data from Supabase
  const stats = {
    totalShows: 24,
    activeArtists: 8,
    monthlyExpenses: 15420,
    upcomingShows: 6,
  }

  const recentShows = [
    {
      id: 1,
      artist: "The Midnight",
      venue: "Blue Note",
      date: "2024-01-15",
      city: "New York",
      status: "confirmed",
    },
    {
      id: 2,
      artist: "Synthwave Dreams",
      venue: "Electric Ballroom",
      date: "2024-01-18",
      city: "Los Angeles",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome to your Artist Gig Scheduler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shows</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalShows}</div>
            <p className="text-xs text-gray-600">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Artists</CardTitle>
            <Music className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.activeArtists}</div>
            <p className="text-xs text-gray-600">+1 new this month</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.monthlyExpenses}</div>
            <p className="text-xs text-gray-600">-5% from last month</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Shows</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.upcomingShows}</div>
            <p className="text-xs text-gray-600">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shows */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shows</CardTitle>
          <CardDescription>Latest scheduled performances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentShows.map((show) => (
              <div key={show.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{show.artist}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {show.venue}, {show.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{new Date(show.date).toLocaleDateString()}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      show.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {show.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
