"use client";
import { Confetti } from "@/components/Confetti";
import { Timer, TimerHandle } from "@/components/Timer";
import { useEffect, useRef, useState } from "react";

// Custom hook for managing local storage
function useLocalStorage(key: string, initialValue: number) {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            try {
                const item = window.localStorage.getItem(key);
                setStoredValue(item ? JSON.parse(item) : initialValue);
            } catch (error) {
                console.log(error);
            }
        }
    }, [isClient, key, initialValue]);

    const setValue = (value: any) => {
        try {
            setStoredValue(value);
            if (isClient) {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue] as const;
}

export default function Home() {
    const [finished, setFinished] = useState(false);

    const weeks = [
        [2, 3, 2, 2, 3],
        [3, 4, 3, 2, 4],
        [5, 6, 4, 3, 6],
        [5, 6, 5, 4, 6],
        [6, 6, 5, 4, 6],
        [6, 7, 5, 5, 7],
        [10, 12, 8, 6, 9],
        [10, 12, 9, 6, 7, 12],
        [12, 13, 9, 8, 9, 13],
        [12, 14, 13, 9, 12, 15],
        [12, 14, 13, 11, 10, 11, 16],
        [13, 15, 15, 13, 10, 11, 18],
        [14, 15, 16, 14, 11, 12, 19],
        [14, 16, 16, 14, 10, 9, 9, 21],
        [15, 16, 16, 14, 11, 12, 10, 11, 24],
        [15, 16, 24, 23, 16, 13, 16, 10, 14, 25],
        [16, 17, 25, 25, 19, 14, 19, 14, 16, 27],
        [17, 22, 28, 28, 21, 16, 22, 19, 21, 30],
        [15, 16, 24, 23, 16, 13, 16, 10, 14, 32],
        [16, 17, 25, 25, 19, 14, 19, 14, 16, 34],
        [15, 16, 24, 23, 16, 13, 16, 10, 14, 42],
        [17, 22, 28, 28, 21, 16, 22, 19, 21, 36],
        [16, 17, 25, 25, 19, 14, 19, 14, 16, 46],
        [17, 22, 28, 28, 21, 16, 22, 19, 14, 50],
    ];

    const [week, setWeek] = useLocalStorage("selectedWeek", 0);
    const timerRef = useRef<TimerHandle | null>(null);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 dark:bg-slate-900">
            <select
                className="h-16  max-w-md w-full rounded-lg p-4 shadow-lg"
                onChange={(event) => {
                    const weekNumber = parseInt(event.target.value);
                    setWeek(weekNumber);
                }}
                value={week}
            >
                {weeks.map((week, index) => (
                    <option key={index} value={index}>
                        Niveau: {index + 1}
                    </option>
                ))}
            </select>
            <div className="flex flex-col items-center justify-center gap-4 dark:text-white">
                {weeks[week].map((day, index) => (
                    <div
                        key={index}
                        className="flex w-full items-center justify-end gap-2"
                    >
                        <label
                            htmlFor={day.toString()}
                            className="text-2xl font-bold"
                        >
                            {day}
                        </label>
                        <input
                            id={day.toString()}
                            type="checkbox"
                            key={index}
                            className="h-12 w-12 rounded-lg p-4 shadow-lg"
                            onChange={() => {
                                // Check if all checkboxes are checked
                                const checkboxes = document.querySelectorAll(
                                    "input[type=checkbox]",
                                );
                                const checked = document.querySelectorAll(
                                    "input[type=checkbox]:checked",
                                );
                                console.log({ timer: timerRef.current });
                                if (timerRef && timerRef.current) {
                                    timerRef.current.toggle();
                                }
                                if (checkboxes.length === checked.length) {
                                    setFinished(true);
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
            <Timer ref={timerRef} week={week} />
            {finished && <Confetti />}
        </main>
    );
}
