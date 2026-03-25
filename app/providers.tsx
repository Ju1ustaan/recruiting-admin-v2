'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from '@/shared/ui/admin-snackbar'
import { BackgroundProvider } from '@/shared/providers/BackgroundProvider'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                <BackgroundProvider>
                    {children}
                </BackgroundProvider>
            </SnackbarProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}