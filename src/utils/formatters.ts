export const formatCurrency = (amount: number | string | undefined | null): string => {
    if (!amount) return "۰";
    const parsed = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(parsed)) return "۰";

    return parsed.toLocaleString("fa-IR");
};

export const formatDate = (date: string | Date | undefined | null): string => {
    if (!date) return "-";

    try {
        return new Date(date).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    } catch (err) {
        return "-";
    }
};
