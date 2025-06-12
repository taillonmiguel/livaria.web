"use client"

// App.tsx
import { AppRoutes } from "./router"
import { SideNav } from "./shared/components/SideNav"
import { useState, useEffect } from "react"
import { useMobileDetect } from "./hooks/useMobileDetect"
import "./App.css"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMobileDetect()

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  return (
    <div className="app-container">
      <SideNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
