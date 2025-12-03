import {
    ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

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

export type TimerHandle = {
    toggle: () => void;
};

export const Timer = forwardRef<TimerHandle, { week: number }>(
    (
        {
            week,
        }: {
            week: number;
        },
        ref: ForwardedRef<any>,
    ) => {
        const SHORT_TIME = 60;
        const LONG_TIME = 120;
        const WEEK_THRESHOLD = 6;
        const initialTime = week < WEEK_THRESHOLD ? SHORT_TIME : LONG_TIME;
        const [isActive, setIsActive] = useState(false);
        const [timer, setTimer] = useTimer(initialTime, isActive);

        const toggle = useCallback(() => {
            setIsActive(!isActive);
        }, [isActive]);

        const reset = useCallback(() => {
            setTimer(week < WEEK_THRESHOLD ? SHORT_TIME : LONG_TIME);
            setIsActive(false);
        }, [week]);

        useEffect(() => {
            setTimer(week < WEEK_THRESHOLD ? SHORT_TIME : LONG_TIME);
        }, [week]);

        // Reset the timer when it reaches 0
        useEffect(() => {
            if (timer === 0) {
                setIsActive(false);
                setTimer(week < WEEK_THRESHOLD ? SHORT_TIME : LONG_TIME);
            }
        }, [timer]);

        useImperativeHandle(ref, () => {
            return {
                toggle,
            };
        });

        return (
            <div className="flex flex-col items-center gap-4">
                <div className="text-6xl font-mono font-bold tracking-widest text-white">
                    {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                    {timer % 60}
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full border-slate-600 bg-slate-800 text-white hover:bg-slate-700 hover:text-white"
                        onClick={() => toggle()}
                    >
                        {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full border-slate-600 bg-slate-800 text-white hover:bg-slate-700 hover:text-white"
                        onClick={() => reset()}
                    >
                        <RotateCcw className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        );
    },
);

Timer.displayName = "Timer";
