export interface LogoutButtonProps {
  showText?: boolean
  text?: string
  icon?: React.ReactNode
  className?: string
  textClassName?: string
  iconClassName?: string
  redirectTo?: string
  onLogout?: () => void
}