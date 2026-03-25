'use client'

import { AdminFilters } from "@/widgets/admin-filters"
import { AdminEcosystem } from "@/widgets/admin-ecosystem"
import { AdminCategory } from "@/widgets/admin-category"
import { Tabs } from "@/shared/admin-tabs"


const tabs = [
    { id: 'filters', label: 'Фильтры' },
    { id: 'ecosystem', label: 'Экосистема' },
    { id: 'category', label: 'Категории' },
]


const VacancyFilters = () => {
    return (
        <div className="">
            <div className="">
                <Tabs
                    tabs={tabs}
                    renderContent={(activeTab) => (
                        <div className="p-5">
                            {activeTab === 'filters' &&
                                (
                                    <div>
                                        {/* график работы */}
                                        <AdminFilters title="График работы" name="workSchedule" />
                                        {/* специализация */}
                                        <AdminFilters title="Специализация" name="specialization" />
                                        {/* опыт работы */}
                                        <AdminFilters title="Опыт работы" name="experience" />
                                        {/* зарплата */}
                                        <AdminFilters title="Зарплата" name="salary" />
                                        {/* регион */}
                                        <AdminFilters title="Регион" name="region" />
                                        {/* образование */}
                                        <AdminFilters title="Образование" name="education" />
                                        {/* прочее */}
                                        <AdminFilters title="Прочее" name="advantage" />
                                    </div>
                                )}
                            {activeTab === 'ecosystem' && <AdminEcosystem />}
                            {activeTab === 'category' && <AdminCategory/>}
                        </div>
                    )}
                />
            </div>


        </div>
    )
}

export default VacancyFilters