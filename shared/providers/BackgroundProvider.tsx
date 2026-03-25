'use client'

import { useEffect, useState } from 'react'

export const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
  const [bg, setBg] = useState(
    "https://img.freepik.com/free-vector/gradient-blue-background_23-2149333530.jpg"
  )

  useEffect(() => {
    const stored = localStorage.getItem('admin-background')
    if (stored) setBg(stored)

    // слушаем изменения localStorage
    const handleStorage = () => {
      const updated = localStorage.getItem('admin-background')
      if (updated) setBg(updated)
    }

    window.addEventListener('storage', handleStorage)

    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      {children}
    </div>
  )
}