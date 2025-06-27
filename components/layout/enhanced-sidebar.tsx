"use client"

import { X, Home, Calendar, Users, Music, CreditCard, DollarSign, Settings, UserCog, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

interface EnhancedSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function EnhancedSidebar({ activeView, setActiveView, isOpen, setIsOpen }: EnhancedSidebarProps) {
  const { user, signOut } = useAuth()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, roles: ["all"] },
    { id: "calendar", label: "Calendar", icon: Calendar, roles: ["all"] },
    { id: "artists", label: "Artists", icon: Music, roles: ["all"] },
    { id: "show-details", label: "Show Details", icon: Users, roles: ["all"] },
    {
      id: "expenses",
      label: "Travel Expenses",
      icon: CreditCard,
      roles: ["Band Staff", "Driver", "Manager", "Producer", "Master"],
    },
    { id: "finance", label: "Finance", icon: DollarSign, roles: ["Finance", "Master"] },
    { id: "users", label: "User Management", icon: UserCog, roles: ["Master"] },
    { id: "system-parameters", label: "System Parameters", icon: Shield, roles: ["Master"] },
    { id: "settings", label: "Settings", icon: Settings, roles: ["all"] },
  ]

  const hasPermission = (roles: string[]) => {
    if (roles.includes("all")) return true
    return user?.role && roles.includes(user.role)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1f1f1f] border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                AGS
              </span>
              <p className="text-xs text-gray-400">Artist Gig Scheduler</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            if (!hasPermission(item.roles)) return null

            const Icon = item.icon
            const isActive = activeView === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => {
                  setActiveView(item.id)
                  setIsOpen(false)
                }}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || "U"}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
              <p className="text-xs text-gray-400">{user?.role || "Role"}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}
