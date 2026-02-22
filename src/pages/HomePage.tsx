import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden px-6 py-12">

            <div className="absolute top-0 -left-20 w-48 h-48 sm:w-72 sm:h-72 bg-brand-primary/20 blur-[80px] sm:blur-[120px] rounded-full" />
            <div className="absolute bottom-0 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-600/10 blur-[100px] sm:blur-[150px] rounded-full" />

            <main className="flex-1 flex flex-col items-center justify-center relative z-10 text-center max-w-4xl w-full">

                <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-brand-border bg-white/5 backdrop-blur-md animate-in fade-in zoom-in duration-700">
                    <span className="text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-[0.2em]">
                        Freelance Universe v1.0
                    </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                    پروژه‌های خود را به <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 drop-shadow-sm">
                        ما بسپارید
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-brand-text-muted mb-12 max-w-2xl mx-auto leading-relaxed px-2">
                    پلتفرمی هوشمند برای اتصالِ مستقیمِ متخصصان به پروژه‌هایِ چالش‌برانگیز.
                    تجربه‌ای مدرن از مدیریتِ تسک‌ها در یک مدارِ امن و مهندسی‌شده.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <Button
                        onClick={() => navigate("/auth")}
                        className="w-full sm:w-56 h-14 text-lg shadow-xl shadow-brand-primary/15"
                    >
                        ورود به پورتال
                    </Button>

                    <Button
                        variant="secondary"
                        className="w-full sm:w-56 h-14 text-lg border-brand-border"
                        onClick={() => window.open('https://github.com/ho3inmoradiii', '_blank')}
                    >
                        مشاهده سورس‌کد
                    </Button>
                </div>
            </main>

            <footer className="relative z-10 pt-12 text-brand-text-muted text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-60">
                طراحی شده با ❤️ و TypeScript
            </footer>
        </div>
    );
};
