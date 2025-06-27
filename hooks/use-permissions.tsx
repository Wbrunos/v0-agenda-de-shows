"use client"

import { useAuth } from "./use-auth"

export function usePermissions() {
  const { user } = useAuth()

  const hasExpensePermission = () => {
    const allowedRoles = ["Master", "Producer", "Manager", "Band Staff", "Driver"]
    return user?.role && allowedRoles.includes(user.role)
  }

  const canViewFinance = () => {
    const allowedRoles = ["Master", "Finance"]
    return user?.role && allowedRoles.includes(user.role)
  }

  const canEditShows = () => {
    const allowedRoles = ["Master", "Producer"]
    return user?.role && allowedRoles.includes(user.role)
  }

  const canManageUsers = () => {
    return user?.role === "Master"
  }

  const canViewExpenses = () => {
    const allowedRoles = ["Master", "Producer", "Manager", "Finance"]
    return user?.role && allowedRoles.includes(user.role)
  }

  return {
    hasExpensePermission,
    canViewFinance,
    canEditShows,
    canManageUsers,
    canViewExpenses,
    userRole: user?.role,
  }
}
