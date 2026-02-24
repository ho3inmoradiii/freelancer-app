import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button.tsx";

export const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
            <div className="absolute w-96 h-96 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-lg text-center">
                <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-2xl shadow-red-500/5">
                    <ShieldAlert className="w-12 h-12" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    محدودیت سطح دسترسی <span className="text-red-500">(خطای ۴۰۳)</span>
                </h1>

                <p className="text-brand-text-muted text-base leading-relaxed mb-10 px-4">
                    دسترسی به این بخش از سامانه امکان‌پذیر نیست. حساب کاربری شما فاقد مجوزهای لازم جهت مشاهده این صفحه می‌باشد.
                    در صورت نیاز به دسترسی، لطفاً با مدیر سیستم تماس بگیرید.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto px-8 h-12 bg-white text-brand-bg hover:bg-white/90 font-medium"
                    >
                        <Home className="w-4 h-4 ml-2" />
                        بازگشت به صفحه اصلی
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}
                        variant="ghost"
                        className="w-full sm:w-auto px-8 h-12 border border-brand-border text-brand-text-muted hover:text-white font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 ml-2" />
                        بازگشت به مرحله قبل
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-8 text-[10px] text-brand-text-muted uppercase tracking-[0.4em] opacity-40 font-mono">
                System Access Control Protocol
            </div>
        </div>
    );
};
