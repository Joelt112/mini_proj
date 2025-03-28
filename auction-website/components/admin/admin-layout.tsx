import Link from "next/link"
import { Gavel, LayoutDashboard, Users, CreditCard, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 pt-20 hidden lg:block">
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Gavel className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 hover:text-primary"
              asChild
            >
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 hover:text-primary"
              asChild
            >
              <Link href="/admin/users">
                <Users className="h-5 w-5 mr-3" />
                Users
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 hover:text-primary"
              asChild
            >
              <Link href="/admin/payments">
                <CreditCard className="h-5 w-5 mr-3" />
                Payments
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 hover:text-primary"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </Button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-primary">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">{children}</main>
    </div>
  )
}

