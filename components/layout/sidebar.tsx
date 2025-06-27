"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Calendar, Home, Users, Music, Settings, DollarSign, Receipt, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const { user, signOut } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "calendar", label: "Agenda", icon: Calendar },
    { id: "artists", label: "Artistas", icon: Music },
    { id: "finance", label: "Financeiro", icon: DollarSign },
    { id: "expenses", label: "Despesas", icon: Receipt },
    { id: "users", label: "Usuários", icon: Users },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  return (
    <div
      className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">AGS</h1>
                <p className="text-slate-400 text-xs">Artist Gig Scheduler</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 ${
              activeView === item.id ? "bg-slate-800 text-white" : ""
            } ${isCollapsed ? "px-2" : ""}`}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">{item.label}</span>}
          </Button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        {!isCollapsed && (
          <div className="bg-slate-800 rounded-lg p-3 mb-2">
            <p className="text-white text-sm font-medium">{user?.name}</p>
            <p className="text-slate-400 text-xs">{user?.email}</p>
            <p className="text-blue-400 text-xs">{user?.role}</p>
          </div>
        )}
        <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-slate-800" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sair</span>}
        </Button>
      </div>
    </div>
  )
}
