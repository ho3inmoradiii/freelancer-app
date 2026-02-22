import { Button } from "./Button";

interface ErrorUIProps {
    errorMessage: string;
    onReset: () => void;
}

export const ErrorUI = ({ errorMessage, onReset }: ErrorUIProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-6 text-center">
            <div className="absolute w-72 h-72 bg-red-500/10 blur-[120px] rounded-full pointer-events-none"/>
            <div className="relative z-10 max-w-md">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">اختلال در اجرای دستورات</h2>
                <p className="text-brand-text-muted mb-8 leading-relaxed">
                    متأسفانه خطایی رخ داده است. این موضوع به مدیرانِ سیستم گزارش شد. لطفاً دوباره تلاش کنید.
                </p>
                <pre className="text-[10px] text-red-400 bg-red-500/5 p-4 rounded-lg mb-8 overflow-auto max-h-32 font-mono border border-red-500/10 text-center">
                    {errorMessage}
                </pre>
                <Button onClick={onReset} className="w-full h-12">
                    تلاش مجدد
                </Button>
            </div>
        </div>
    );
};
