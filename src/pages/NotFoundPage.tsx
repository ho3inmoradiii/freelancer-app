import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
            <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest animate-pulse">
                404
            </h1>
            <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute">
                آدرس مورد نظر یافت نشد.
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-8 px-8 py-3 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 font-bold shadow-lg shadow-blue-500/10"
            >
                بازگشت به صفحه اصلی
            </button>
        </div>
    );
};
