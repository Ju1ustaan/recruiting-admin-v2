'use client'
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
const QuestionDetailsPage = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div>
            <Link href="/vacancy/test-page">Назад</Link>
            <h1>Question Details {pathname}</h1>
            <p>This is the details page for a specific question.</p>
        </div>
    )
}

export default QuestionDetailsPage