import { AdminContainer } from "@/shared/admin-container/ui/AdminContainer"
import { AdminNavbar } from "@/widgets/admin-navbar/ui/AdminNavbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 min-h-screen p-2">
      <div className="w-[300px] shrink-0 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 shadow-lg">
        <p className="text-3xl font-bold p-5 text-gray-700">Dashboard</p>
        <AdminNavbar />
      </div>
      <AdminContainer>{children}</AdminContainer>
    </div>
  )
}