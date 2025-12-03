"use client";
import { Confetti } from "@/components/Confetti";
import { Timer, TimerHandle } from "@/components/Timer";
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check, Trophy, Dumbbell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const [completedSets, setCompletedSets] = useState<number[]>([]);
    const timerRef = useRef<TimerHandle | null>(null);

    const currentWeekSets = weeks[week];
    const currentSetIndex = completedSets.length;
    const isWorkoutComplete = completedSets.length === currentWeekSets.length;

    useEffect(() => {
        if (isWorkoutComplete) {
            setFinished(true);
        } else {
            setFinished(false);
        }
    }, [isWorkoutComplete]);

    const handleSetComplete = () => {
        if (currentSetIndex < currentWeekSets.length) {
            setCompletedSets([...completedSets, currentSetIndex]);
            if (currentSetIndex < currentWeekSets.length - 1) {
                timerRef.current?.toggle();
            }
        }
    };

    const handleReset = () => {
        setCompletedSets([]);
        setFinished(false);
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4 text-white">
            <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/20 p-2 text-primary">
                            <Dumbbell className="h-6 w-6" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Pushup Tracker</h1>
                    </div>
                    <Select
                        value={week.toString()}
                        onValueChange={(value) => {
                            setWeek(parseInt(value));
                            setCompletedSets([]);
                            setFinished(false);
                        }}
                    >
                        <SelectTrigger className="w-[140px] border-slate-700 bg-slate-800 text-white">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800 text-white">
                            {weeks.map((_, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    Level {index + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Main Workout Card */}
                <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-white">
                            {isWorkoutComplete ? "Workout Complete!" : `Set ${currentSetIndex + 1}`}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            {isWorkoutComplete
                                ? "Great job! You've finished all sets."
                                : `Target: ${currentWeekSets[currentSetIndex]} pushups`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-6">
                        {isWorkoutComplete ? (
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-500/20 text-green-500 ring-4 ring-green-500/20">
                                <Trophy className="h-16 w-16" />
                            </div>
                        ) : (
                            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary/10 text-6xl font-black text-primary ring-8 ring-primary/20">
                                {currentWeekSets[currentSetIndex]}
                            </div>
                        )}

                        <div className="w-full">
                            <Timer ref={timerRef} week={week} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isWorkoutComplete ? (
                            <Button 
                                onClick={handleReset} 
                                className="w-full bg-white text-slate-900 hover:bg-slate-200"
                                size="lg"
                            >
                                Start Over
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSetComplete}
                                className="w-full text-lg font-semibold"
                                size="lg"
                            >
                                <Check className="mr-2 h-5 w-5" />
                                Complete Set
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Progress List */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Workout Progress</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {currentWeekSets.map((amount, index) => {
                            const isCompleted = completedSets.includes(index);
                            const isCurrent = index === currentSetIndex;
                            
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex flex-col items-center justify-center rounded-lg border p-2 transition-all",
                                        isCompleted
                                            ? "border-green-500/50 bg-green-500/10 text-green-500"
                                            : isCurrent
                                            ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                                            : "border-slate-700 bg-slate-800/50 text-slate-500"
                                    )}
                                >
                                    <span className="text-xs font-medium">Set {index + 1}</span>
                                    <span className="text-lg font-bold">{amount}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {finished && <Confetti />}
        </main>
    );
}
