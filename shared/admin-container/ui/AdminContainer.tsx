import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}


export const AdminContainer = ({children}: Props) => {
    return (
        <div className="pt-14 p-5 w-full">
            {children}
        </div>
    )
}