"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { CalendarView } from "@/components/calendar/calendar-view"
import { ArtistManagement } from "@/components/artists/artist-management"
import { UserManagement } from "@/components/users/user-management"
import { SystemSettings } from "@/components/settings/system-settings"
import { FinanceDashboard } from "@/components/finance/finance-dashboard"
import { TravelExpenses } from "@/components/expenses/travel-expenses"

export function Dashboard() {
  const [activeView, setActiveView] = useState("home")

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <DashboardHome />
      case "calendar":
        return <CalendarView />
      case "artists":
        return <ArtistManagement />
      case "users":
        return <UserManagement />
      case "settings":
        return <SystemSettings />
      case "finance":
        return <FinanceDashboard />
      case "expenses":
        return <TravelExpenses />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
