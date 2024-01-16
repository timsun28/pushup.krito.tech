import { useCallback, useEffect, useState } from "react";

// Custom hook for managing timer
function useTimer(initialTime: number, isActive: boolean) {
    const [timer, setTimer] = useState(initialTime);

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

    return [timer, setTimer] as const;
}

export const Timer = ({ week }: { week: number }) => {
    const SHORT_TIME = 60;
    const LONG_TIME = 120;
    const WEEK_THRESHOLD = 6;
    const initialTime = week < WEEK_THRESHOLD ? SHORT_TIME : LONG_TIME;
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useTimer(initialTime, false);

    const toggle = useCallback(() => {
        setIsActive(!isActive);
    }, [isActive]);

    const reset = useCallback(() => {
        setTimer(week < WEEK_THRESHOLD ? SHORT_TIME : LONG_TIME);
        setIsActive(false);
    }, [week]);

    useEffect(() => {
        setTimer(week < 6 ? 60 : 120);
    }, [week]);

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
    );
};
