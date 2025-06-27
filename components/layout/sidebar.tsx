"use client"

import { X, Home, Calendar, Users, Music, CreditCard, DollarSign, Settings, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ activeView, setActiveView, isOpen, setIsOpen }: SidebarProps) {
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
    { id: "settings", label: "Parameters", icon: Settings, roles: ["Master"] },
  ]

  const hasPermission = (roles: string[]) => {
    if (roles.includes("all")) return true
    return user?.role && roles.includes(user.role)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Music className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AGS
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            if (!hasPermission(item.roles)) return null

            const Icon = item.icon
            const isActive = activeView === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "hover:bg-gray-100"
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

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || "U"}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}
