'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export const BackButton = () => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 cursoir-pointer"
        >
            <ArrowLeft className="w-4 h-4" />
            Назад
        </button>
    )
}