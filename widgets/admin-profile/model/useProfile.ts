'use client'

import { useEffect, useState } from "react"

const BACKGROUNDS = [
  '/blue-background-1.jpg',
  '/yellow-background.jpg',
  '/purple-background.jpg',
  '/rainbow-sky-background.jpg'
]

export const useProfile = () => {
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUNDS[0])

  useEffect(() => {
    const stored = localStorage.getItem('admin-background')
    if (stored) {
      setSelectedBackground(stored)
    }
  }, [])

  const changeBackground = (url: string) => {
    setSelectedBackground(url)
    localStorage.setItem('admin-background', url)
    window.dispatchEvent(new Event('storage'))
  }

  return {
    backgrounds: BACKGROUNDS,
    selectedBackground,
    changeBackground,
  }
}