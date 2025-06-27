"use client"

import { useState } from "react"
import { EnhancedSidebar } from "@/components/layout/enhanced-sidebar"
import { Header } from "@/components/layout/header"
import { CalendarView } from "@/components/calendar/calendar-view"
import { ArtistManagement } from "@/components/artists/artist-management"
import { ShowDetails } from "@/components/shows/show-details"
import { ExpenseRegistration } from "@/components/expenses/expense-registration"
import { FinanceDashboard } from "@/components/finance/finance-dashboard"
import { EnhancedUserManagement } from "@/components/users/enhanced-user-management"
import { SystemParameters } from "@/components/settings/system-parameters"
import { DashboardHome } from "@/components/dashboard/dashboard-home"

export function EnhancedDashboard() {
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
        return <ExpenseRegistration />
      case "finance":
        return <FinanceDashboard />
      case "users":
        return <EnhancedUserManagement />
      case "system-parameters":
        return <SystemParameters />
      case "settings":
        return (
          <div className="p-6 bg-[#0f0f0f] min-h-screen">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
          </div>
        )
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <EnhancedSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main>{renderContent()}</main>
      </div>
    </div>
  )
}
