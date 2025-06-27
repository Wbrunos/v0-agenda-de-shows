"use client"

import { EnhancedLoginForm } from "@/components/auth/enhanced-login-form"
import { EnhancedDashboard } from "@/components/dashboard/enhanced-dashboard"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-400">Loading AGS System...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <EnhancedLoginForm />
  }

  return <EnhancedDashboard />
}
