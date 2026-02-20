import { useSyncExternalStore } from 'react';

let lastTick = Date.now();
const listeners = new Set<() => void>();

const timeStore = {
    subscribe(onStoreChange: () => void) {
        listeners.add(onStoreChange);

        lastTick = Date.now();

        const interval = setInterval(() => {
            lastTick = Date.now();
            listeners.forEach(l => l());
        }, 1000);

        return () => {
            clearInterval(interval);
            listeners.delete(onStoreChange);
        };
    },
    getSnapshot: () => lastTick,
    getServerSnapshot: () => 0
};

export const useCountdown = (targetTimestamp: number | null) => {
    const now = useSyncExternalStore(
        timeStore.subscribe,
        timeStore.getSnapshot,
        timeStore.getServerSnapshot
    );

    const seconds = targetTimestamp
        ? Math.max(0, Math.floor((targetTimestamp - now) / 1000))
        : 0;

    return {
        seconds,
        isFinished: targetTimestamp !== null && seconds <= 0,
    };
};
