const storagePrefix = 'freelancer_app_';

export const storage = {
    set: <T>(key: string, value: T): void => {
        try {
            window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
        } catch (error) {
            console.error('مشکلی در ذخیره سازی پیش آمده است: ', error);
        }
    },

    get: <T>(key: string): T | null => {
        const value = window.localStorage.getItem(`${storagePrefix}${key}`);
        if (!value) return null;
        try {
            return JSON.parse(value) as T;
        } catch {
            console.error('مشکلی پیش آمده است: ');
            return null;
        }
    },

    remove: (key: string) => {
        window.localStorage.removeItem(`${storagePrefix}${key}`);
    },

    clear: (): void => {
        Object.keys(window.localStorage).forEach((key) => {
            if (key.startsWith(storagePrefix)) {
                window.localStorage.removeItem(key);
            }
        });
    },
};
