'use client'
import { PictureList } from "@/widgets/admin-picture"
import { Tabs } from "@/shared/ui/admin-tabs"

const tabs = [
    { id: 'vacancy', label: 'Картинки для вакансий' },
]


const MediaPage = () => {
    return (
        <div className="">
            <PictureList />
        </div>
    )
}

export default MediaPage