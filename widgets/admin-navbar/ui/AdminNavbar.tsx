'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, BriefcaseBusiness, SlidersHorizontal, ClipboardList, LucideIcon, VideoIcon, ImageIcon, UsersRound } from "lucide-react"

interface ChildLink {
    path: string
    name: string
    icon?: LucideIcon
}

interface NavLink {
    path: string
    name: string
    icon?: LucideIcon
    childLinks?: ChildLink[]
}

const navLinks: NavLink[] = [
    { path: '/', name: 'Главная' },
    { path: '/candidate', name: 'Кандидаты',
        childLinks: [
            { path: '/candidate', name: 'Кандидаты', icon: UsersRound }
        ]},
    { path: '/media', name: 'Медиа',
        childLinks: [
            { path: '/media', name: 'Изображения', icon: ImageIcon },
            { path: '/media/video', name: 'Видео', icon: VideoIcon },
        ]},
    {
        path: '/vacancy',
        name: 'Вакансии',
        childLinks: [
            { path: '/vacancy', name: 'Вакансии', icon: BriefcaseBusiness },
            { path: '/vacancy/filters', name: 'Фильтры', icon: SlidersHorizontal },
            { path: '/vacancy/test-page', name: 'Тест', icon: ClipboardList },
        ]
    },
]

const baseClass = "flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-blue-600 hover:text-gray-300 hover:scale-105"
const activeClass = "bg-blue-600 text-gray-300"

const NavItem = ({ link }: { link: NavLink }) => {
    const pathname = usePathname()
    const isActive = pathname === link.path
    const isGroupActive = !!link.childLinks && pathname.startsWith(link.path)
    const [isOpen, setIsOpen] = useState(isGroupActive)

    // ─── С дочерними ссылками ─────────────────────────
    if (link.childLinks) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full justify-between ${baseClass} ${isGroupActive ? activeClass : ''}`}
                >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-2 flex flex-col gap-0.5 pl-2">
                        {link.childLinks.map((child) => {
                            const isChildActive = pathname === child.path
                            const Icon = child.icon
                            return (
                                <Link
                                    key={child.path}
                                    href={child.path}
                                    className={`text-sm ps-1 ${baseClass} ${isChildActive ? activeClass : 'text-gray-600'}`}
                                >
                                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                                    {child.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    // ─── Обычная ссылка ───────────────────────────────
    return (
        <Link href={link.path} className={`${baseClass} ${isActive ? activeClass : ''}`}>
            {link.icon && <link.icon className="w-4 h-4 shrink-0" />}
            {link.name}
        </Link>
    )
}

export const AdminNavbar = () => {
    return (
        <nav className="flex flex-col text-gray-700 font-bold gap-0.5">
            {navLinks.map((link) => (
                <NavItem key={link.path + link.name} link={link} />
            ))}
        </nav>
    )
}