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