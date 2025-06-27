"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { CalendarView } from "@/components/calendar/calendar-view"
import { ArtistManagement } from "@/components/artists/artist-management"
import { ShowDetails } from "@/components/shows/show-details"
import { TravelExpenses } from "@/components/expenses/travel-expenses"
import { FinanceDashboard } from "@/components/finance/finance-dashboard"
import { UserManagement } from "@/components/users/user-management"
import { SystemSettings } from "@/components/settings/system-settings"
import { DashboardHome } from "@/components/dashboard/dashboard-home"

export function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardHome />
      case "calendar":
        return <CalendarView />
      case "artists":
        return <ArtistManagement />
      case "show-details":
        return <ShowDetails />
      case "expenses":
        return <TravelExpenses />
      case "finance":
        return <FinanceDashboard />
      case "users":
        return <UserManagement />
      case "settings":
        return <SystemSettings />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
