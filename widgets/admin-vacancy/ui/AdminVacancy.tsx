'use client'

import { FilterChoice } from "./FilterChoice"

import { useEcosystem } from "@/widgets/admin-ecosystem"
import { useCategory } from "@/widgets/admin-category"
import { useQuestionsGroup } from "@/widgets/admin-questions/model/useQuestionsGroup"
import { useKnowledgeGroup } from "@/widgets/admin-knowledge/model/useKnowledgeGroup"
import { useAdditionalGroup } from "@/widgets/admin-additional/model/useAdditionalGroup"




const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''
export const AdminVacancy = () => {
    const { ecosystems } = useEcosystem()
    const { category } = useCategory()
    const { items } = useQuestionsGroup()
    const { groups } = useKnowledgeGroup()
    const {additionalGroups} = useAdditionalGroup()
    return (
        <div className="space-y-3">

            
            <p className="font-semibold">Введите название вакансии</p>
            <input placeholder="Название вакансии..." type="text" className="bg-white/40 backdrop-blur-md border border-white/50 group rounded-md inline-block w-full p-2"/>



            <p className="font-semibold">Выберите экосистему</p>
            <div className="max-h-64 overflow-y-scroll overflow-hidden">
                {ecosystems.map((ecosystem) => (
                    <div className="bg-white/40 backdrop-blur-md border border-white/50 group rounded-md overflow-hidden flex items-center ps-5">
                        <p className="text-sm w-4/12">{ecosystem.ecosystemName}</p>
                        <p className="text-sm w-7/12">{ecosystem.ecosystemDescription}</p>
                        <div className="overflow-hidden w-1/12 max-h-20">
                            <img className="w-full h-full object-contain" src={`${BASE_URL}/${ecosystem.ecosystemPicture}`} alt={ecosystem.ecosystemName} />
                        </div>
                    </div>
                ))}
            </div>

            <p className="font-semibold">Выберите категорию</p>
            <div className="max-h-64 overflow-y-scroll overflow-hidden">
                {category.map((cat) => (
                    <div className="bg-white/40 backdrop-blur-md border border-white/50 group rounded-md overflow-hidden flex items-center ps-5">
                        <p className="text-sm w-4/12">{cat.vacancyCategoryName}</p>
                        <p className="text-sm w-7/12">{cat.vacancyCategoryDescription}</p>
                        <div className="overflow-hidden w-1/12 max-h-20">
                            <img className="w-full h-full object-contain" src={`${BASE_URL}/${cat.vacancyCategoryPicture}`} alt={cat.vacancyCategoryName} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2">
                {/* график работы */}
            <FilterChoice title="График работы" name="workSchedule" />
            {/* специализация */}
            <FilterChoice title="Специализация" name="specialization" />
            {/* опыт работы */}
            <FilterChoice title="Опыт работы" name="experience" />
            {/* зарплата */}
            <FilterChoice title="Зарплата" name="salary" />
            {/* регион */}
            <FilterChoice title="Регион" name="region" />
            {/* образование */}
            <FilterChoice title="Образование" name="education" />
            {/* прочее */}
            <FilterChoice title="Прочее" name="advantage" />
            </div>

            <p className="font-semibold">Выберите тест</p>
            <div>
                {
                    items.map((item) => (
                        <div key={item.questionGroupId}>
                            <p className="p-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-md">{item.questionGroupName}</p>
                        </div>
                    ))
                }
            </div>
           
            <p className="font-semibold">Выберите тест на общие знания</p>
            <div>
                {
                    groups.map((item) => (
                        <div key={item.knowledgeGroupId}>
                            <p className="p-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-md">{item.knowledgeGroupName}</p>
                        </div>
                    ))
                }
            </div>
           
            <p className="font-semibold">Выберите дополнительные вопросы</p>
            <div>
                {
                    additionalGroups.map((item) => (
                        <div key={item.additionalQuestionGroupId}>
                            <p className="p-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-md">{item.additionalQuestionGroupName}</p>
                        </div>
                    ))
                }
            </div>

            <button className="bg-green-400/70 backdrop-blur-md border border-white/50 group rounded-md inline-block w-full p-2">Сохранить вакансию</button>

        </div>
    )
}