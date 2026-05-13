import {z} from "zod";

export const moneyFieldSchema = z.string()
    .min(1, 'وارد کردن مبلغ اجباری است')
    .regex(/^\d+$/, "لطفاً یک عدد معتبر وارد کنید")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "مبلغ باید بزرگ‌تر از صفر باشد");
