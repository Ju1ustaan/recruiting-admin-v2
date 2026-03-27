'use client'

import { Tabs } from "@/shared/ui/admin-tabs"
import { AdminVacancy } from "@/widgets/admin-vacancy"
import { VacancyTable } from "@/widgets/admin-vacancy/ui/VacancyTable"

const tabs = [
    { id: 'vacancy-list', label: 'Список вакансий' },
    { id: 'create', label: 'Создать вакансию' },
]
const VacancyPage = () => {
    return (
        <div>
            <Tabs
                tabs={tabs}
                renderContent={(activeTab) => (
                    <div className="p-5">
                        {activeTab === 'vacancy-list' && (<VacancyTable/>)}
                        {activeTab === 'create' && (<AdminVacancy />)}
                    </div>
                )}
            />
        </div>
    )
}

export default VacancyPage