import { z } from "zod";

const fieldTranslations: Record<string, string> = {
    title: "عنوان",
    description: "توضیحات",
    tags: "تگ",
    category: "دسته‌بندی",
    budget: "بودجه",
    deadline: "ددلاین",
    phoneNumber: "شماره تماس",
    otp: "OTP",
    name: "نام"
};

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    const fieldNameEn = issue.path && issue.path.length > 0
        ? String(issue.path[issue.path.length - 1])
        : "";
    const fieldNameFa = fieldTranslations[fieldNameEn] || "این فیلد";

    if (issue.code === z.ZodIssueCode.invalid_type) {
        const invalidTypeIssue = issue as z.ZodInvalidTypeIssue;

        if (invalidTypeIssue.received === "undefined" || invalidTypeIssue.received === "null") {
            return { message: `${fieldNameFa} الزامی است.` };
        }
        return { message: `نوع داده ${fieldNameFa} نامعتبر است.` };
    }

    if (issue.code === z.ZodIssueCode.too_small) {
        const tooSmallIssue = issue as z.ZodTooSmallIssue & { origin?: string };
        const typeOrOrigin = tooSmallIssue.type || tooSmallIssue.origin;

        if (typeOrOrigin === "string") {
            return { message: `${fieldNameFa} باید حداقل ${tooSmallIssue.minimum} کاراکتر باشد.` };
        }
        if (typeOrOrigin === "array") {
            return { message: `حداقل ${tooSmallIssue.minimum} ${fieldNameFa} انتخاب کنید.` };
        }
        if (typeOrOrigin === "number") {
            return { message: `${fieldNameFa} باید بزرگ‌تر از ${tooSmallIssue.minimum} باشد.` };
        }

        return { message: `${fieldNameFa} باید حداقل ${tooSmallIssue.minimum} باشد.` };
    }

    return { message: ctx?.defaultError ?? "مقدار وارد شده نامعتبر است" };
};

z.setErrorMap(customErrorMap);
