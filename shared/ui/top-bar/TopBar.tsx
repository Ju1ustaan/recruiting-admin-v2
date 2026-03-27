import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}


export const TopBar = ({children}: Props) => {
    return (
        <div className='p-4 w-full shrink-0 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 shadow-lg sticky top-0 z-100'>
            {children}
        </div>
    )
}