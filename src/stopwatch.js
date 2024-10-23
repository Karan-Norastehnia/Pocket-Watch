import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const Stopwatch = () => {
    const [,,,, stopwatchState, setStopwatchState, stopwatchTime, setStopwatchTime] = useOutletContext();

    const [minutes, setMinutes] = useState(("0" + Math.floor(stopwatchTime / 6000).toString()).slice(-2));
    const [seconds, setSeconds] = useState(("0" + Math.floor((stopwatchTime / 100) % 60).toString()).slice(-2));
    const [centiSeconds, setCentiSeconds] = useState(("0" + Math.floor(stopwatchTime % 100).toString()).slice(-2));

    const [toggleText, setToggleText] = useState(stopwatchState > 0 ? "Pause" : "Start");

    const reset = () => {
        setStopwatchState(-1);
        setStopwatchTime(0);
        normalizeUtility(0);
        toggle(1);
    };

    const toggle = (currentState) => {
        if (currentState > 0) {
            setStopwatchState(-1);
            setToggleText("Start");
        } else {
            setStopwatchState(1);
            setToggleText("Pause");
        }
    };

    const normalizeUtility = (t) => {
        setMinutes(("0" + Math.floor(t / 6000).toString()).slice(-2));
        setSeconds(("0" + Math.floor((t / 100) % 60).toString()).slice(-2));
        setCentiSeconds(("0" + Math.floor(t % 100).toString()).slice(-2));
    };

    useEffect(() => {
        if (stopwatchState > 0) {
            normalizeUtility(stopwatchTime);
        }
    });

    return (
        <>
            <div>
                <div className="font-bold text-6xl flex justify-center overflow-hidden">
                    <div className="pointer-events-none inline-block w-20 mx-4 text-center">{minutes}</div>
                    <div className="pointer-events-none inline-block w-20 mx-4 text-center">{seconds}</div>
                    <div className="pointer-events-none inline-block w-20 mx-4 text-center">{centiSeconds}</div>
                </div>
            </div>

            <div className="mt-24 flex gap-4 justify-center">
                <button onClick={reset} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 hover:text-neutral-700 border-indigo-300">Reset</button>
                <button onClick={() => toggle(stopwatchState)} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 border-indigo-300 bg-indigo-300 text-neutral-700">{toggleText}</button>
            </div>
        </>
    );
};

export default Stopwatch;
