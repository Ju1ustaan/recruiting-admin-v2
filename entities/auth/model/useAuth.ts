'use client'

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { authApi } from "../api/authApi"

export const useAuth = () => {
    const { success, error } = useSnackbar()
    const router = useRouter()

    const [loginForm, setLoginForm] = useState({ userName: '', password: '' })
    const [registerForm, setRegisterForm] = useState({ userName: '', password: '', email: '' })
    const [forgotUsername, setForgotUsername] = useState('')

    // ─── Логин ────────────────────────────────────────
    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: () => authApi.login(loginForm),
        onSuccess: (token) => {
            localStorage.setItem('token', token)
            success('Добро пожаловать!')
            router.push('/')
        },
        onError: () => error('Неверный логин или пароль'),
    })

    // ─── Регистрация ──────────────────────────────────
    const { mutate: register, isPending: isRegistering } = useMutation({
        mutationFn: () => authApi.register(registerForm),
        onSuccess: () => {
            success('Регистрация успешна, войдите в систему')
            router.push('/login')
        },
        onError: () => error('Ошибка при регистрации'),
    })

    // ─── Забыл пароль ─────────────────────────────────
    const { mutate: sendPassword, isPending: isSendingPassword } = useMutation({
        mutationFn: () => authApi.sendPassword(forgotUsername),
        onSuccess: () => success('Новый пароль отправлен на почту'),
        onError: () => error('Пользователь не найден'),
    })

    const logout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return {
        loginForm, setLoginForm,
        login, isLoggingIn,
        registerForm, setRegisterForm,
        register, isRegistering,
        forgotUsername, setForgotUsername,
        sendPassword, isSendingPassword,
        logout,
    }
}