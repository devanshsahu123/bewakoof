"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(`useLocalStorage setValue error for key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    const remove = useCallback(() => {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
    }, [key, initialValue]);

    useEffect(() => {
        // Sync across tabs
        const handleStorage = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue) as T);
                } catch {
                    // ignore
                }
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [key]);

    return [storedValue, setValue, remove];
}
