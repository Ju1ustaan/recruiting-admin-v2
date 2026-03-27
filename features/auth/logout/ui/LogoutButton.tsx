'use client'

import { LogoutButtonProps } from '../model/types'
import { useLogout } from '../model/useLogout'
import { LogOut } from 'lucide-react'
import clsx from 'clsx'



export const LogoutButton = ({
  showText = true,
  text = 'Выйти',
  icon = <LogOut className="w-4 h-4" />,
  className,
  textClassName,
  iconClassName,
  redirectTo = '/login',
  onLogout,
}: LogoutButtonProps) => {
  const logout = useLogout()

  return (
    <button
      onClick={logout}
      className={clsx(
        'flex items-center gap-2 px-3 py-2 rounded-full aspect-square transition-colors duration-300',
        'hover:bg-white/40 hover:text-red-500 cursor-pointer',
        className
      )}
    >
      <span className={clsx(iconClassName)}>
        {icon}
      </span>

      {showText && (
        <span className={clsx('text-sm', textClassName)}>
          {text}
        </span>
      )}
    </button>
  )
}