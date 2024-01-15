"use client";
import { useEffect, useState } from "react";

export default function Home() {
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
    useEffect(() => {
        const initialWeek = localStorage.getItem("selectedWeek");
        if (initialWeek) {
            setWeek(parseInt(initialWeek));
            setTimer(parseInt(initialWeek) < 6 ? 60 : 120);
        }
    }, []);

    const [week, setWeek] = useState(0);

    // two minute timer
    const [timer, setTimer] = useState(week < 6 ? 60 : 120);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setTimer(week < 6 ? 60 : 120);
        setIsActive(false);
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, timer]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 dark:bg-slate-900">
            <select
                className="h-16 w-full rounded-lg p-4 shadow-lg"
                onChange={(event) => {
                    const weekNumber = parseInt(event.target.value);
                    setWeek(weekNumber);
                    setTimer(weekNumber < 6 ? 60 : 120);
                    // save in local storage
                    localStorage.setItem("selectedWeek", weekNumber.toString());
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
                        />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <button
                    className=" rounded-lg border-2 border-black p-4 shadow-lg dark:border-white dark:text-white"
                    onClick={() => {
                        toggle();
                    }}
                >
                    {isActive ? "Pause" : "Start"}
                </button>
                <button
                    className=" rounded-lg border-2 border-black p-4 shadow-lg dark:border-white dark:text-white"
                    onClick={() => {
                        reset();
                    }}
                >
                    Reset
                </button>
                <div className="text-2xl font-bold dark:text-white">
                    {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                    {timer % 60}
                </div>
            </div>
        </main>
    );
}
