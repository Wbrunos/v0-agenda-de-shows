"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User, Menu } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-white text-xl font-semibold">Bem-vindo, {user?.name || "Usuário"}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar shows, artistas..."
              className="pl-10 bg-slate-700 border-slate-600 text-white w-64"
            />
          </div>

          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
