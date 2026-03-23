import { FilterInput } from "@/widgets/admin-filters"
import { useEcosystem } from "../model/useEcosystem"
import { EcosystemForm } from "./EcosystemForm"

export const AdminEcosystem = () => {
    const { createEcosystem,
        isCreating,
        updateEcosystem,
        isUpdating,
        deleteEcosystem,
        deletingId,
        isDeleting, } = useEcosystem()

    return (
        <div>
            <EcosystemForm/>
            Экосистема
        </div>
    )
}