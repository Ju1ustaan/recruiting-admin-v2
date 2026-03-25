'use client'
 
import { Loader, Send } from "lucide-react"
 
interface GroupFormWrapperProps {
    title: string
    onSubmit: () => void
    isLoading: boolean
    isValid: boolean
    children: React.ReactNode
    submitLabel?: string
}
 
export const GroupFormWrapper = ({
    title,
    onSubmit,
    isLoading,
    isValid,
    children,
    submitLabel = 'Сохранить',
}: GroupFormWrapperProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-base">{title}</h2>
 
            <div className="space-y-3">
                {children}
            </div>
 
            <button
                onClick={onSubmit}
                disabled={isLoading || !isValid}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2
                    hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading
                    ? <><Loader className="w-4 h-4 animate-spin" />Отправка...</>
                    : <><Send className="w-4 h-4" />{submitLabel}</>
                }
            </button>
        </div>
    )
}