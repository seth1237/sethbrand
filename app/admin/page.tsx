import type { Metadata } from "next"
import { AdminApp } from "@/components/admin/admin-app"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="container mx-auto max-w-5xl">
        <AdminApp />
      </div>
    </main>
  )
}
