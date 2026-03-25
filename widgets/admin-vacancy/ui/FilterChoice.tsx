'use client'
import { useAdminFilters } from "@/widgets/admin-filters"
export const FilterChoice = ({ title, name }: { title: string, name: string }) => {
    const {
        items
    } = useAdminFilters(name)
    return (
        <div className="space-y-3">
            <p className="font-semibold">{`Выберите ${title}`}</p>
            <div className="flex gap-2 flex-wrap">
            {
                items.map((item) => (
                    <div key={item.id}>
                        <p className="p-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-md">{item.name}</p>
                    </div>
                ))
            }
        </div>
        </div>
    )
}