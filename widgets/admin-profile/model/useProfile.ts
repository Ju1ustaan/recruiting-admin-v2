'use client'

import { useState } from "react"

const BACKGROUNDS = [
    '/blue-background-1.jpg',
    '/yellow-background.jpg',
    '/purple-background.jpg',
    '/rainbow-sky-background.jpg'
]

export const useProfile = () => {
    const [selectedBackground, setSelectedBackground] = useState(
        () => localStorage.getItem('admin-background') ?? BACKGROUNDS[0]
    )

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