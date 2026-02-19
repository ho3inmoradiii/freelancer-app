import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (targetTimestamp: number | null) => {
    const calculateTimeLeft = useCallback(() => {
        if (!targetTimestamp) return 0;
        const diff = Math.floor((targetTimestamp - Date.now()) / 1000);
        return diff > 0 ? diff : 0;
    }, [targetTimestamp]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeLeft(calculateTimeLeft());
    }, [targetTimestamp, calculateTimeLeft])

    useEffect(() => {
        if (!targetTimestamp || timeLeft <= 0) return;

        const timer = setInterval(() => {
            const nextValue = calculateTimeLeft();
            setTimeLeft(nextValue);

            if (nextValue <= 0) clearInterval(timer);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTimestamp, timeLeft, calculateTimeLeft]);

    return {
        seconds: timeLeft,
        isFinished: timeLeft <= 0,
    };
};
