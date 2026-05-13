import { useCategories } from "@/features/category/api/useCategories";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { cn } from "@/lib/utils";
import { FORM_STYLES } from "@/features/project/components/CreateProjectForm.styles";

type Props = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export const AsyncCategorySelect = ({ value, onChange, error }: Props) => {
    const { data } = useCategories();
    const categories = data.data.categories;

    const categoryOptions = categories.map((cat) => ({
        value: cat._id,
        label: cat.title,
    }));

    return (
        <CustomSelect
            options={categoryOptions}
            value={value}
            onChange={onChange}
            placeholder="انتخاب دسته‌بندی..."
            error={error}
            className={cn(FORM_STYLES.input, "w-full flex items-center justify-between !h-13")}
        />
    );
};
