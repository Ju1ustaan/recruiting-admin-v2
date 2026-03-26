'use client'

import { Tabs } from "@/shared/ui/admin-tabs"
import { AdminVacancy } from "@/widgets/admin-vacancy"
import { VacancyTable } from "@/widgets/admin-vacancy/ui/VacancyTable"

const tabs = [
    { id: 'create', label: 'Создать вакансию' },
    { id: 'vacancy-list', label: 'Список вакансий' },
]
const VacancyPage = () => {
    return (
        <div>
            <Tabs
                tabs={tabs}
                renderContent={(activeTab) => (
                    <div className="p-5">
                        {activeTab === 'create' && (<AdminVacancy />)}
                        {activeTab === 'vacancy-list' && (<VacancyTable/>)}
                    </div>
                )}
            />
        </div>
    )
}

export default VacancyPage