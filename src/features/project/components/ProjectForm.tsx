import { Suspense } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import DatePicker, { type DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { TextField } from "@/components/ui/TextField";
import {
    Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput,
    ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
    ComboboxValue, useComboboxAnchor
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

import { type ProjectForm as ProjectFormType, ProjectFormSchema, type CreateProjectResponse } from "@/features/project/schemas/project.schema";
import { type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { cn } from "@/lib/utils";
import { PROJECT_TAGS } from "@/features/project/constants/project-tags";
import { FORM_STYLES } from "@/features/project/components/CreateProjectForm.styles";
import { AsyncCategorySelect } from "@/features/category/components/AsyncCategorySelect";
import { FieldWrapper } from "@/features/project/components/FieldWrapper";

type ProjectFormProps = {
    onSubmitAction: (data: ProjectFormType) => Promise<CreateProjectResponse | SuccessMessageResponse>;
    isLoading: boolean;
    initialData?: Partial<ProjectFormType>;
    formTitle: string;
    btnText: string;
    loadingText: string;
    successMessage: string;
    errorMessage: string;
    onSuccessCallback?: () => void;
}

export const ProjectForm = ({
                                onSubmitAction,
                                isLoading,
                                initialData,
                                formTitle,
                                btnText,
                                loadingText,
                                successMessage,
                                errorMessage,
                                onSuccessCallback
                            }: ProjectFormProps) => {
    const anchor = useComboboxAnchor();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<ProjectFormType>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            tags: [],
            title: "",
            description: "",
            budget: "0",
            deadline: null,
            category: "",
            ...initialData
        },
        values: initialData as ProjectFormType
    });

    const onSubmit = (data: ProjectFormType) => {
        const promise = onSubmitAction(data).then(() => {
            if (!initialData) reset();
            if (onSuccessCallback) onSuccessCallback();
        });

        toast.promise(promise, {
            loading: loadingText,
            success: successMessage,
            error: (err) => err.response?.data?.message || errorMessage,
        });
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-10 border-r-4 border-brand-primary pr-6">
                <h2 className="text-2xl font-black text-white">{formTitle}</h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-surface/40 backdrop-blur-xl border border-brand-border p-8 md:p-12 rounded-[2.5rem] relative shadow-2xl"
            >
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="space-y-10 relative z-10">
                    <TextField
                        {...register('title')}
                        label="عنوان پروژه"
                        placeholder="مثلاً: سیستم مدیریت هوشمند"
                        error={errors.title?.message}
                    />

                    <FieldWrapper label="دسته‌بندی" error={errors.category?.message}>
                        <Controller
                            control={control}
                            name="category"
                            render={({field}) => (
                                <Suspense fallback={<div className="h-13 w-full bg-brand-surface/80 animate-pulse rounded-xl" />}>
                                    <AsyncCategorySelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.category?.message}
                                    />
                                </Suspense>
                            )}
                        />
                    </FieldWrapper>

                    <TextField
                        {...register("budget")}
                        label="بودجه"
                        error={errors.budget?.message}
                    />
                </div>

                <div className="space-y-10 relative z-10">
                    <TextField
                        {...register('description')}
                        label="توضیحات"
                        placeholder="شرح مختصری از پروژه..."
                        error={errors.description?.message}
                    />

                    <FieldWrapper label="تگ‌های پروژه" error={errors.tags?.message}>
                        <Controller
                            control={control}
                            name="tags"
                            render={({field}) => (
                                <Combobox
                                    multiple
                                    items={PROJECT_TAGS}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <ComboboxChips ref={anchor}
                                                   className={cn(
                                                       FORM_STYLES.input,
                                                       "h-auto py-2 flex-wrap gap-2",
                                                       errors.tags && "border-red-500/50 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10"
                                                   )}>
                                        <ComboboxValue>
                                            {(values: string[]) => (
                                                <>
                                                    {values.length > 2 ? (
                                                        <div
                                                            className="bg-brand-primary/20 text-brand-primary border border-brand-primary/30 flex h-7 items-center justify-center rounded-md px-2 text-xs font-medium">
                                                            {values.length} تگ انتخاب شده
                                                        </div>
                                                    ) : (
                                                        values.map((val) => (
                                                            <ComboboxChip key={val}
                                                                          className="bg-brand-primary/20 text-brand-primary border-brand-primary/30">
                                                                {val}
                                                            </ComboboxChip>
                                                        ))
                                                    )}
                                                    <ComboboxChipsInput placeholder="جستجوی تگ..."
                                                                        className="placeholder:text-brand-text-muted text-base font-medium bg-transparent outline-none"/>
                                                </>
                                            )}
                                        </ComboboxValue>
                                    </ComboboxChips>
                                    <ComboboxContent anchor={anchor} dir="rtl"
                                                     className="bg-brand-surface border-brand-border text-white rounded-2xl overflow-hidden shadow-2xl z-50">
                                        <ComboboxEmpty className="p-4 text-xs">موردی یافت نشد.</ComboboxEmpty>
                                        <ComboboxList className="p-2">
                                            {(item: string) => (
                                                <ComboboxItem key={item} value={item}
                                                              className="rounded-lg hover:bg-white/5 cursor-pointer p-2 transition-colors">
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            )}
                        />
                    </FieldWrapper>

                    <FieldWrapper label="ددلاین پروژه" error={errors.deadline?.message}>
                        <Controller
                            control={control}
                            name="deadline"
                            render={({field: {onChange, value}}) => (
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    value={value}
                                    onChange={(date: DateObject) => onChange(date ? date.toDate() : null)}
                                    containerClassName="w-full flex"
                                    render={(val, openCalendar) => (
                                        <button
                                            type="button"
                                            onClick={openCalendar}
                                            className={cn(
                                                FORM_STYLES.input,
                                                "text-right flex items-center justify-between",
                                                errors.deadline && "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                            )}
                                        >
                                            {
                                                val ? <span>{val}</span> :
                                                    <span className="text-base font-medium text-brand-text-muted">انتخاب تاریخ...</span>
                                            }
                                        </button>
                                    )}
                                />
                            )}
                        />
                    </FieldWrapper>
                </div>

                <div className="md:col-span-2 mt-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 cursor-pointer"
                    >
                        {isLoading ? loadingText : btnText}
                    </Button>
                </div>
            </form>
        </div>
    );
};
