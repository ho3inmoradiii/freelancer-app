import { useNavigate } from "react-router-dom";
import { AppButton } from "@/components/ui/AppButton.tsx";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-bg px-6 py-24">
            <div className="w-full max-w-xl text-center">

                <p className="text-sm font-bold tracking-[0.3em] uppercase text-brand-primary mb-4">
                    Error 404
                </p>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    صفحه مورد نظر یافت نشد
                </h1>

                <p className="text-brand-text-muted text-base md:text-lg leading-relaxed mb-12 max-w-md mx-auto">
                    متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا آدرس آن تغییر یافته است.
                    لطفاً از دکمه‌های زیر برای بازگشت به مسیر اصلی استفاده کنید.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <AppButton
                        onClick={() => navigate("/")}
                        className="w-full sm:w-48 h-12"
                    >
                         صفحه اصلی
                    </AppButton>

                    <AppButton
                        variant="secondary"
                        className="w-full sm:w-48 h-12"
                        onClick={() => navigate(-1)}
                    >
                        صفحه قبلی
                    </AppButton>
                </div>

                <div className="mt-20 pt-8 border-t border-brand-border">
                    <p className="text-[10px] text-brand-text-muted/50 uppercase tracking-widest">
                        Freelance Universe | System Notification
                    </p>
                </div>
            </div>
        </div>
    );
};
