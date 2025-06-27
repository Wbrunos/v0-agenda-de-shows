"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { ShowCalendar } from "@/components/show-calendar"
import { ShowList } from "@/components/show-list"
import { ArtistManagement } from "@/components/artist-management"

export function Dashboard() {
  const [activeView, setActiveView] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <DashboardHome />
      case "calendar":
        return <ShowCalendar />
      case "shows":
        return <ShowList />
      case "artists":
        return <ArtistManagement />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
