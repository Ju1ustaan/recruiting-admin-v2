'use client'

import Link from "next/link"
import { useState } from "react"
import { Loader, ExternalLink, CheckCircle  } from "lucide-react"
import { useVacancyForm } from "../model/useVacancyForm"
import { ConfirmDialog } from "@/shared/ui/confirm-dialog"

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

export const VacancyTable = () => {
const {
    vacancies, isLoadingVacancies,
    isActive, setIsActive,
    updateVacancy, isUpdating, togglePublish,
    deleteVacancy, deletingId, isDeleting, toggleCvActivated
} = useVacancyForm()

    const [confirmId, setConfirmId] = useState<number | null>(null)



    if (isLoadingVacancies) return (
        <div className="flex justify-center py-10">
            <Loader className="w-6 h-6 animate-spin text-gray-400" />
        </div>
    )

    return (
        <div className="space-y-4">

            {/* Фильтр активности */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsActive(true)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                        ${isActive ? 'bg-green-500 text-white border-green-500' : 'bg-white/40 border-white/50 text-gray-600 hover:border-green-400'}`}
                >
                    Опубликованные
                </button>
                <button
                    onClick={() => setIsActive(false)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                        ${!isActive ? 'bg-gray-500 text-white border-gray-500' : 'bg-white/40 border-white/50 text-gray-600 hover:border-gray-400'}`}
                >
                    Неопубликованные
                </button>
            </div>

            {/* Таблица */}
            {vacancies.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">Вакансий пока нет</p>
            ) : (
                <div className="rounded-xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-md">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/40 bg-white/20">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">#</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Название</th>

                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Образование</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">График</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Специализация</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Зарплата</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Регион</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Опыт</th>

                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Тест</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Знания</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Доп вопрос</th>
                                
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Изображение</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Резюме</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-40">Публикация</th>
                                <th className="px-4 py-3 w-10" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/30">
                            {vacancies.map((vacancy, index) => (
                                <tr key={vacancy.vacancyId} className="hover:bg-white/20 transition-colors group">

                                    {/* Номер */}
                                    <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>

                                    {/* Название */}
                                    <td className="px-4 py-3">
                                        <Link href={`/vacancy/${vacancy.vacancyId}`} className="font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 cursor-pointer flex gap-2 items-center">
                                        <ExternalLink width={18} height={18}/>
                                        {vacancy.vacancyName}
                                        </Link>
                                    </td>

                                    <td>{vacancy.education && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.workSchedule && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.specialization && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.salary && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.region && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.experience && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>

                                    <td>{vacancy.questionGroupId && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.knowledgeGroupId && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>
                                    <td>{vacancy.additionalQuestionGroupId && <CheckCircle width={18} height={18} className="text-green-600 mx-auto"/>}</td>


                                    {/* Изображение */}
                                    <td className="px-4 py-3">
                                        {vacancy.vacancyPictures ? (
                                            <div className="w-16 h-10 rounded overflow-hidden bg-white/40">
                                                <img
                                                    src={`${BASE_URL}/${vacancy.vacancyPictures.pictureName}`}
                                                    alt={vacancy.vacancyName}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-10 rounded bg-gray-100/50 flex items-center justify-center">
                                                <span className="text-xs text-gray-300">нет</span>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        <button
                                        onClick={() => toggleCvActivated(vacancy)}
                                            disabled={isUpdating}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all
                                                ${vacancy.cvIsActive
                                                    ? 'bg-green-500/20 text-green-700 border-green-300 hover:bg-green-500 hover:text-white'
                                                    : 'bg-gray-100/50 text-gray-500 border-gray-300 hover:bg-gray-500 hover:text-white'
                                                } disabled:opacity-50`}
                                        >
                                            {isUpdating
                                                ? <Loader className="w-3 h-3 animate-spin" />
                                                : <div className={`w-2 h-2 rounded-full ${vacancy.cvIsActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            }
                                            {vacancy.cvIsActive ? 'Требуется' : 'Не требуется'}
                                        </button>
                                    </td>

                                    {/* Тогл публикации */}
                                    <td className="px-4 py-3">
                                        <button
                                        onClick={() => togglePublish(vacancy)}
                                            disabled={isUpdating}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all
                                                ${vacancy.isActive
                                                    ? 'bg-green-500/20 text-green-700 border-green-300 hover:bg-green-500 hover:text-white'
                                                    : 'bg-gray-100/50 text-gray-500 border-gray-300 hover:bg-gray-500 hover:text-white'
                                                } disabled:opacity-50`}
                                        >
                                            {isUpdating
                                                ? <Loader className="w-3 h-3 animate-spin" />
                                                : <div className={`w-2 h-2 rounded-full ${vacancy.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            }
                                            {vacancy.isActive ? 'Опубликовано' : 'Не опубликовано'}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmId !== null}
                title="Удалить вакансию?"
                description="Это действие нельзя отменить"
                isLoading={isDeleting}
                onConfirm={() => { if (confirmId) deleteVacancy(confirmId); setConfirmId(null) }}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    )
}



// additionalQuestionGroupId: 2
// advantageId: 4
// ecosystemId: 0
// educationId: 2
// experienceId: 3
// isActive: true
// knowledgeGroupId: 3
// questionGroupId: 37
// regionId: 2
// salaryId: 1
// specializationId: 3
// vacancyCategoryId: 0
// vacancyId: 2
// vacancyName: "фронтенд"
// vacancyPicturesId: 14
// workScheduleId:30

//   "additionalQuestionGroupId": 0,
//   "advantageId": 0,
//   "ecosystemId": 0,
//   "educationId": 0,
//   "experienceId": 0,
//   "isActive": true,
//   "knowledgeGroupId": 0,
//   "questionGroupId": 0,
//   "regionId": 0,
//   "salaryId": 0,
//   "specializationId": 0,
//   "vacancyCategoryId": 0,
//   "vacancyId": 0
//   "vacancyName": "string",
//   "vacancyPicturesId": 0,
//   "workScheduleId": 0,
