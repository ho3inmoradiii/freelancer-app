import { useSearchParams } from "react-router-dom";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { SORT_VALUES } from "@/features/project/constants/sort-values";

const sortOptions = [
    { label: "جدیدترین‌ها", value: SORT_VALUES.LATEST },
    { label: "قدیمی‌ترین‌ها", value: SORT_VALUES.EARLIEST },
];

export function SortFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortValue = searchParams.get("sort") || "latest";

    const handleSortChange = (newSort: string) => {
        setSearchParams(prev => {
            prev.set('sort', newSort);
            return prev;
        });
    };

    return (
        <CustomSelect
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
            placeholder="مرتب‌سازی..."
            className="w-48 !h-12 !min-h-12 rounded-xl bg-transparent border-gray-800"
        />
    );
}
