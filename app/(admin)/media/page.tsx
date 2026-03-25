'use client'
import { PictureList } from "@/widgets/admin-picture"
import { Tabs } from "@/shared/admin-tabs"

const tabs = [
    { id: 'vacancy', label: 'Картинки для вакансий' },
    { id: 'question', label: 'Картинки для вопросов' },
]


const MediaPage = () => {
    return (
        <div className="">
            <Tabs
                tabs={tabs}
                renderContent={(activeTab) => (
                    <div className="p-5">
                        {activeTab === 'vacancy' && (<div><PictureList /></div>)}
                        {activeTab === 'question' && (<div>question</div>)}
                    </div>
                )} />

        </div>
    )
}

export default MediaPage