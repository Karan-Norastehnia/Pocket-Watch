import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const Timer = () => {
    const [defaultTime] = useState(300);
    
    const [timerState, setTimerState, timerTime, setTimerTime] = useOutletContext();

    const [hours, setHours] = useState(("0" + Math.floor((timerTime / 3600)).toString()).slice(-2));
    const [minutes, setMinutes] = useState(("0" + Math.floor((timerTime / 60) % 60).toString()).slice(-2));
    const [seconds, setSeconds] = useState(("0" + Math.floor(timerTime % 60).toString()).slice(-2));

    const [toggleText, setToggleText] = useState(timerState > 0 ? "Pause" : "Start");

    const reset = () => {
        setTimerState(-1);
        setTimerTime(defaultTime);
        normalizeUtility(defaultTime);
        toggle(1);
    };

    const toggle = (currentState) => {
        if (currentState > 0) {
            setTimerState(-1);
            setToggleText("Start");
        } else {
            setTimerState(1);
            setToggleText("Pause");
        }
    };

    const normalizeUtility = (t) => {
        setHours(("0" + Math.floor((t / 3600)).toString()).slice(-2));
        setMinutes(("0" + Math.floor((t / 60) % 60).toString()).slice(-2));
        setSeconds(("0" + Math.floor(t % 60).toString()).slice(-2));
    };

    const normalize = () => {
        const newTime = parseInt(seconds) + parseInt(minutes)*60 + parseInt(hours)*3600;
        setTimerTime(newTime);
        normalizeUtility(newTime);
    };

    useEffect(() => {
        if (timerState > 0) {
            normalizeUtility(timerTime);
        }
    });

    const setValue = (input, current) => {
        let result = (current + input).slice(-2);

        return result;
    };

    const ignore = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <>
            <div>
                <div className="font-bold text-6xl">
                    <input onKeyDown={ignore} disabled={timerState > 0 ? "disabled" : ""} onBlur={normalize} onInput={(event) => setHours(setValue(event.target.value, hours))}     value={hours}   className={"transition duration-100 bg-neutral-900 border-b-2 outline-none inline-block w-20 ml-4 mr-4 " + (timerState < 0 ? "border-neutral-700 text-neutral-400" : "border-neutral-900")} />
                    <input onKeyDown={ignore} disabled={timerState > 0 ? "disabled" : ""} onBlur={normalize} onInput={(event) => setMinutes(setValue(event.target.value, minutes))} value={minutes} className={"transition duration-100 bg-neutral-900 border-b-2 outline-none inline-block w-20 ml-4 mr-4 " + (timerState < 0 ? "border-neutral-700 text-neutral-400" : "border-neutral-900")} />
                    <input onKeyDown={ignore} disabled={timerState > 0 ? "disabled" : ""} onBlur={normalize} onInput={(event) => setSeconds(setValue(event.target.value, seconds))} value={seconds} className={"transition duration-100 bg-neutral-900 border-b-2 outline-none inline-block w-20 ml-4 mr-4 " + (timerState < 0 ? "border-neutral-700 text-neutral-400" : "border-neutral-900")} />
                </div>
            </div>

            <div className="mt-24 flex gap-4 justify-center">
                <button onClick={reset} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 hover:text-neutral-700 border-indigo-300">Reset</button>
                <button onClick={() => toggle(timerState)} className="transition duration-200 py-2 px-12 rounded-3xl border-2 hover:bg-indigo-200 hover:border-indigo-200 border-indigo-300 bg-indigo-300 text-neutral-700">{toggleText}</button>
            </div>
        </>
    );
};

export default Timer;
