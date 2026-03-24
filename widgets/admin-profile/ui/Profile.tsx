// import Image from 'next/image'

// import yellowBackground from '@/shared/assets/yellow-background.jpg'
// import purpleBackground from '@/shared/assets/purple-background.jpg'
// import rainbowSkyBackground from '@/shared/assets/rainbow-sky-background.jpg'


// const backgrounds = [
//     yellowBackground,
//     purpleBackground,
//     rainbowSkyBackground
// ]
// export const Profile = () => {
//     return (
//         <div>
//             <h1>Профиль</h1>
//             <p></p> 
//             <div className='flex gap-4'>
//                 <Image className='rounded border-2 border-white/40 p-2' src='/blue-background-1.jpg' alt="Blue Background" width={288} height={288} />
//                 <Image className='rounded' src={yellowBackground} alt="Blue Background" width={288} height={288} />
//                 <Image className='rounded' src={purpleBackground} alt="Blue Background" width={288} height={288} />
//                 <Image className='rounded' src={rainbowSkyBackground} alt="Blue Background" width={288} height={288} />
//             </div>
//         </div>
//     )
// }
'use client'

import { ChoiceBackground } from "./ChoiceBackground"
import { useProfile } from "../model/useProfile"

export const Profile = () => {
    const { backgrounds, selectedBackground, changeBackground } = useProfile()

    return (
        <div className="space-y-6 p-4">
            <h1 className="text-2xl font-bold text-gray-700">Профиль</h1>

            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-5 shadow-sm space-y-5">
                <ChoiceBackground
                    backgrounds={backgrounds}
                    selected={selectedBackground}
                    onChange={changeBackground}
                />
            </div>
        </div>
    )
}