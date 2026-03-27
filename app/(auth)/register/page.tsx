'use client'

import { useState } from "react"
import { Loader, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/entities/auth/model/useAuth"
import Link from "next/link"

export default function RegisterPage() {
    const { registerForm, setRegisterForm, register, isRegistering } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const isValid =
        !!registerForm.userName.trim() &&
        !!registerForm.password.trim() &&
        !!registerForm.email.trim()

    return (
        <div className="w-full min-h-screen ml-auto mr-0 max-w-sm space-y-6 bg-white/30 backdrop-blur-md border border-white/50 rounded p-8 shadow-lg">
            <div>
                <h1 className="text-2xl font-bold text-gray-700">Регистрация</h1>
                <p className="text-sm text-gray-400 mt-1">Создайте новый аккаунт</p>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Имя пользователя</label>
                    <input
                        type="text"
                        value={registerForm.userName}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, userName: e.target.value }))}
                        className="w-full p-2 text-sm rounded-lg border border-white/50 bg-white/40 backdrop-blur-md outline-blue-400"
                        placeholder="username"
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Email</label>
                    <input
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 text-sm rounded-lg border border-white/50 bg-white/40 backdrop-blur-md outline-blue-400"
                        placeholder="email@example.com"
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Пароль</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full p-2 pr-10 text-sm rounded-lg border border-white/50 bg-white/40 backdrop-blur-md outline-blue-400"
                            placeholder="••••••••"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => register()}
                disabled={!isValid || isRegistering}
                className="w-full py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium
                    hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isRegistering ? <><Loader className="w-4 h-4 animate-spin" />Регистрация...</> : 'Зарегистрироваться'}
            </button>

            <div className="text-center text-xs text-gray-400">
                Уже есть аккаунт?{' '}
                <Link href="/login" className="text-blue-500 hover:underline">Войти</Link>
            </div>
        </div>
    )
}