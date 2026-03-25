'use client'

import { useState } from "react"
import { CheckSquare2 } from "lucide-react"
import { Picture } from "@/entities/picture"

type Props = {
    pictures: Picture[]
    choiceImg: string
    setChoiceImg: (prop: string) => void
}

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''
export const ImagesDialog = ({pictures, choiceImg, setChoiceImg}: Props) => {
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2">
                <div className="max-h-48 overflow-y-scroll grid grid-cols-2 py-2">
                    {
                    pictures.map((pic) => (
                        <div onClick={() => setChoiceImg(pic.pictureName)} className="rounded hover:bg-gray-200 overflow-hidden group flex justify-between items-center cursor-pointer w-1/2" key={pic.pictureId}>
                            <p className="text-sm">{pic.pictureDescription}</p>
                            {(choiceImg === pic.pictureName) && (<CheckSquare2 className="w-5 h-5 text-green-600"/>)}
                        </div>
                    ))
                }
                </div>
                <div className="w-full h-48 border flex justify-center items-center rounded-md border-gray-300 px-10">
                    {
                        choiceImg?
                        <><img className="w-full h-full object-contain" src={`${BASE_URL}/${choiceImg}`} alt={choiceImg} /><span>{choiceImg}</span></>
                        :
                        <p className="text-sm text-gray-300">выберите картинку из списка</p>
                    }
                </div>
            </div>
        </div>
    )
}