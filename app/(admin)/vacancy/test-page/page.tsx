'use client'

import { Tabs } from "@/shared/admin-tabs"
import { AdminQuestions } from "@/widgets/admin-questions"
import { AdminAdditional } from "@/widgets/admin-additional"
import { AdminKnowledge } from "@/widgets/admin-knowledge"

const tabs = [
    { id: 'question', label: 'Тестовые вопросы' },
    { id: 'knowledge-question', label: 'Знания' },
    { id: 'additional-question', label: 'Дополнительные вопросы' },
]


const TestPage = () => {
    return (
        <div className="">
            <Tabs
                tabs={tabs}
                renderContent={(activeTab) => (
                    <div className="p-5">
                        {activeTab === 'question' && <AdminQuestions />}
                        {activeTab === 'knowledge-question' && <AdminKnowledge />}
                        {activeTab === 'additional-question' && <AdminAdditional />}
                    </div>
                )}
            />
        </div>
    )
}

export default TestPage