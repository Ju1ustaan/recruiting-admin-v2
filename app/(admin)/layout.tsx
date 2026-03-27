'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import { AdminContainer } from "@/shared/ui/admin-container/ui/AdminContainer"
import { AdminNavbar } from "@/widgets/admin-navbar/ui/AdminNavbar"
import { TopBar } from "@/shared/ui/top-bar"
import { LogoutButton } from "@/features/auth/logout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  // const token = cookies().get('token')?.value

  // if (!token) {
  //   redirect('/login')
  // }

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) router.replace('/login')
  }, [])

  return (
    <div className="flex gap-3 min-h-screen p-2">
      <div className="w-75 shrink-0 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 shadow-lg">
        <div className=" sticky top-0 left-0">
          <p className="text-3xl font-bold p-5 text-gray-700">Dashboard</p>
          <AdminNavbar />
        </div>
      </div>
      <div className="space-y-2 w-full">
        <TopBar>
          <div className="flex justify-end">
            <LogoutButton
              showText={false}
            />
          </div>
        </TopBar>
        <AdminContainer>{children}</AdminContainer>
      </div>
    </div>
  )
}