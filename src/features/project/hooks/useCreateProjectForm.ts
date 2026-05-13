import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormSchema, type ProjectForm } from "../schemas/project.schema";
import { useCreateProject } from "../api/useCreateProject";
import { toast } from "sonner";

export const useCreateProjectForm = () => {
    const { mutateAsync, isPending } = useCreateProject();

    const form = useForm<ProjectForm>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            title: "",
            description: "",
            budget: 0,
            tags: [],
            category: "",
            deadline: null
        }
    });

    const onSubmit = async (data: ProjectForm) => {
        const promise = mutateAsync(data);
        toast.promise(promise, {
            loading: 'در حال ذخیره پروژه...',
            success: "پروژه با موفقیت در هسته مرکزی ثبت شد",
            error: (err) => err.response?.data?.message || "خطا در ارتباط با سرور",
        });
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isPending
    };
};
