import { VacancyEdit } from "@/widgets/admin-vacancy"
import { BackButton } from "@/shared/ui/back-button"


const VacancyDetail = ({ params }: { params: { id: string } }) => {
    return (
        <div className="border-b border-white/40 bg-white/20 p-2 rounded-md">
            <VacancyEdit vacancyId={Number(params.id)} />
        </div>
    )
}

export default VacancyDetail
