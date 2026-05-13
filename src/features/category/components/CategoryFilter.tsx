import { useSearchParams } from "react-router-dom";
import { useCategories } from "../api/useCategories";
import { CustomSelect } from "@/components/shared/CustomSelect";

export const CategoryFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data } = useCategories();
    const categories = data.data.categories;

    const categoryValue = searchParams.get("category") || "ALL";

    const handleCategoryChange = (val: string) => {
        setSearchParams(prev => {
            if (val === "ALL" || !val) {
                prev.delete("category");
            } else {
                prev.set("category", val);
            }
            prev.delete("page");
            return prev;
        });
    };

    const options = categories.map(cat => ({
        value: cat.englishTitle,
        label: cat.title,
    }));

    const finalOptions = [
        { value: "ALL", label: "همه دسته‌بندی‌ها" },
        ...options
    ];

    return (
        <CustomSelect
            options={finalOptions}
            value={categoryValue}
            onChange={handleCategoryChange}
            placeholder="دسته‌بندی"
            className="w-48 !h-12 !min-h-12 rounded-xl bg-transparent border-gray-800"
        />
    );
};
