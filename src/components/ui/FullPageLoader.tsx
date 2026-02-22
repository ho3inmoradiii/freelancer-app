export const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-bg">
            <div className="absolute w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full animate-pulse" />

            <div className="relative flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />

                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold tracking-[0.3em] uppercase text-brand-primary animate-pulse">
                        Authenticating
                    </span>
                    <span className="text-[10px] text-brand-text-muted mt-2">
                        در حال برقراری اتصالِ امن...
                    </span>
                </div>
            </div>
        </div>
    );
};
