'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('adminAuthenticated') === 'true'
      setIsAuthenticated(authenticated)
      
      if (!authenticated && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router, pathname])

  // Handle redirect when authenticated user is on login page
  useEffect(() => {
    if (isAuthenticated && pathname === '/admin/login') {
      router.push('/admin')
    }
  }, [isAuthenticated, pathname, router])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    router.push('/admin/login')
  }

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on login page, redirect (handled in useEffect)
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  if (isAuthenticated && pathname === '/admin/login') {
    return null
  }

  // If on login page, show children without layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show admin layout with logout button
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header with Logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">FirstAlu Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {children}
    </div>
  )
}